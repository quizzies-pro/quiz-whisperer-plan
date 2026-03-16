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

  // Import the RSA private key — handle various escape formats
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\r?\n/g, "")
    .replace(/\s/g, "")
    .trim();
  
  let keyBuf: Uint8Array;
  try {
    keyBuf = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));
  } catch (e) {
    throw new Error(`Failed to decode base64 PEM. Length: ${pemBody.length}, first 20 chars: ${pemBody.substring(0, 20)}`);
  }

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyBuf,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(signingInput));
  const jwt = `${signingInput}.${b64url(signature)}`;

  // Exchange JWT for access token
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const email = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY");
    const sheetId = Deno.env.get("GOOGLE_SHEET_ID");

    if (!email || !privateKey || !sheetId) {
      console.error("Missing Google Sheets credentials");
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

    // Restore escaped newlines in private key (secrets may store \\n literally)
    const fixedKey = privateKey.replace(/\\n/g, "\n");
    console.log("Private key starts with:", fixedKey.substring(0, 40));
    console.log("Private key length:", fixedKey.length);
    console.log("Contains BEGIN PRIVATE KEY:", fixedKey.includes("BEGIN PRIVATE KEY"));

    const accessToken = await getAccessToken(email, fixedKey);

    const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const row = [
      name || "",
      leadEmail || "",
      phone || "",
      answers?.["5"] || "",
      answers?.["6"] || "",
      answers?.["7"] || "",
      answers?.["9"] || "",
      String(body.current_step || ""),
      now,
    ];

    const sheetsRes = await fetch(
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

    const sheetsData = await sheetsRes.json();
    if (!sheetsRes.ok) {
      console.error("Google Sheets API error:", sheetsData);
      return new Response(JSON.stringify({ error: "Sheets API error", details: sheetsData }), {
        status: sheetsRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Lead appended to Google Sheets:", sheetsData.updates?.updatedRange);

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
