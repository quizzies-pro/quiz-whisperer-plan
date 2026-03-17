import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { decode as decodeBase64 } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Build a JWT from the service account credentials and exchange it for an access token
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
    "pkcs8",
    keyBuf,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(signingInput));
  const jwt = `${signingInput}.${b64url(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

// Helper: fetch all rows from the sheet
async function getSheetData(accessToken: string, sheetId: string): Promise<string[][]> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:I`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json();
  return data.values || [];
}

// Helper: find row index by email (column B = index 1)
function findRowByEmail(rows: string[][], email: string): number {
  for (let i = 1; i < rows.length; i++) { // skip header
    if (rows[i]?.[1]?.toLowerCase() === email.toLowerCase()) {
      return i + 1; // 1-indexed for Sheets API
    }
  }
  return -1;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const saEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY");
    const sheetId = Deno.env.get("GOOGLE_SHEET_ID");

    if (!saEmail || !privateKey || !sheetId) {
      return new Response(JSON.stringify({ error: "Google Sheets not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { name, phone, email: leadEmail, answers } = body;

    if (!name && !leadEmail) {
      return new Response(JSON.stringify({ error: "Name or email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fixedKey = privateKey.replace(/\\n/g, "\n");
    const accessToken = await getAccessToken(saEmail, fixedKey);

    const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const row = [
      name || "",
      leadEmail || "",
      phone ? `'${phone}` : "",
      answers?.["5"] || "",
      answers?.["6"] || "",
      answers?.["7"] || "",
      answers?.["9"] || "",
      String(body.current_step || ""),
      now,
    ];

    // Check if lead already exists by email
    const existingRows = await getSheetData(accessToken, sheetId);
    const existingRowIndex = leadEmail ? findRowByEmail(existingRows, leadEmail) : -1;

    let sheetsRes: Response;

    if (existingRowIndex > 0) {
      // UPDATE existing row
      const range = `A${existingRowIndex}:I${existingRowIndex}`;
      sheetsRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values: [row] }),
        }
      );
      console.log(`Lead UPDATED in row ${existingRowIndex} (${leadEmail})`);
    } else {
      // APPEND new row
      sheetsRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:I:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values: [row] }),
        }
      );
      console.log(`Lead APPENDED (${leadEmail})`);
    }

    const sheetsData = await sheetsRes.json();
    if (!sheetsRes.ok) {
      console.error("Google Sheets API error:", sheetsData);
      return new Response(JSON.stringify({ error: "Sheets API error", details: sheetsData }), {
        status: sheetsRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
