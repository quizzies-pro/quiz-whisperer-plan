import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode as decodeBase64 } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getAccessToken(email: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const enc = new TextEncoder();
  const b64url = (buf: ArrayBuffer | Uint8Array) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const headerB64 = b64url(enc.encode(JSON.stringify(header)));
  const payloadB64 = b64url(enc.encode(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  let cleaned = privateKeyPem;
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1);
  }
  cleaned = cleaned
    .replace(/\\n/g, "")
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/[^A-Za-z0-9+/=]/g, "");

  const keyBuf = decodeBase64(cleaned);
  const key = await crypto.subtle.importKey(
    "pkcs8", keyBuf, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(signingInput));
  const jwt = `${signingInput}.${b64url(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${JSON.stringify(tokenData)}`);
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const saEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY");
    const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!saEmail || !privateKey || !sheetId) {
      return new Response(JSON.stringify({ error: "Google Sheets not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sb = createClient(supabaseUrl, supabaseKey);

    // Fetch all leads from DB (excluding empty ones)
    const { data: leads, error: dbError } = await sb
      .from("quiz_leads")
      .select("*")
      .or("name.neq.,email.neq.")
      .order("created_at", { ascending: true });

    if (dbError) throw new Error(`DB error: ${dbError.message}`);

    // Deduplicate by email (keep the one with highest current_step)
    const byEmail = new Map<string, typeof leads[0]>();
    for (const lead of leads || []) {
      if (!lead.email) continue;
      const key = lead.email.toLowerCase();
      const existing = byEmail.get(key);
      if (!existing || (lead.current_step || 0) > (existing.current_step || 0)) {
        byEmail.set(key, lead);
      }
    }

    const fixedKey = privateKey.replace(/\\n/g, "\\n");
    const accessToken = await getAccessToken(saEmail, fixedKey);

    // Build rows: Name, Email, WhatsApp, Objetivo, Experiência, Tempo, Investimento, Step, Data/Hora
    const header = ["Nome", "Email", "WhatsApp", "Objetivo", "Experiência", "Tempo", "Investimento", "Step", "Data/Hora"];
    const rows = [header];

    for (const lead of byEmail.values()) {
      const answers = (lead.answers as Record<string, string>) || {};
      const createdAt = new Date(lead.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      rows.push([
        lead.name || "",
        lead.email || "",
        lead.phone ? `'${lead.phone}` : "",
        answers["5"] || "",
        answers["6"] || "",
        answers["7"] || "",
        answers["9"] || "",
        String(lead.current_step || ""),
        createdAt,
      ]);
    }

    // Clear existing data
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:I:clear`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );

    // Write all rows
    const sheetsRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: rows }),
      }
    );

    const sheetsData = await sheetsRes.json();
    if (!sheetsRes.ok) {
      console.error("Sheets API error:", sheetsData);
      return new Response(JSON.stringify({ error: "Sheets API error", details: sheetsData }), {
        status: sheetsRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Sheet rebuilt with ${rows.length - 1} leads`);

    return new Response(JSON.stringify({ success: true, leads_written: rows.length - 1 }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
