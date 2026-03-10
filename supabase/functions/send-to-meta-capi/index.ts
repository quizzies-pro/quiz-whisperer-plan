import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pixelId = Deno.env.get("META_PIXEL_ID");
    const accessToken = Deno.env.get("META_ACCESS_TOKEN");

    if (!pixelId || !accessToken) {
      console.error("META_PIXEL_ID or META_ACCESS_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "Meta credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { event_name, event_id, email, phone, name, answers, client_ua, fbc, fbp, external_id } = body;

    if (!event_name) {
      return new Response(
        JSON.stringify({ error: "event_name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get real client IP from request headers (set by CDN/proxy)
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("x-real-ip") 
      || req.headers.get("cf-connecting-ip")
      || null;

    // Build user_data with hashed PII
    const userData: Record<string, unknown> = {};
    if (email) userData.em = [await sha256(email)];
    if (phone) {
      const digits = normalizePhone(phone);
      if (digits) userData.ph = [await sha256(digits)];
    }
    if (name) {
      const parts = name.trim().split(/\s+/);
      if (parts[0]) userData.fn = [await sha256(parts[0])];
      if (parts.length > 1) userData.ln = [await sha256(parts[parts.length - 1])];
    }
    if (clientIp) userData.client_ip_address = clientIp;
    if (client_ua) userData.client_user_agent = client_ua;
    userData.country = [await sha256("br")];

    // Meta click/browser cookies for attribution
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    // Stable external_id for session linking
    if (external_id) {
      userData.external_id = [await sha256(external_id)];
    } else if (!email && !phone) {
      userData.external_id = [await sha256(crypto.randomUUID())];
    }

    // Build custom_data from quiz answers
    const customData: Record<string, string> = {};
    if (answers) {
      if (answers["5"]) customData.objetivo = answers["5"];
      if (answers["6"]) customData.experiencia = answers["6"];
      if (answers["7"]) customData.tamanho_cidade = answers["7"];
      if (answers["8"]) customData.disponibilidade = answers["8"];
      if (answers["10"]) customData.faixa_investimento = answers["10"];
      if (answers["11"]) customData.qtd_motos = answers["11"];
    }

    const eventData: Record<string, unknown> = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: "https://aplicacao.franquiaslocagora.com",
      user_data: userData,
    };

    // event_id for deduplication between Pixel and CAPI
    if (event_id) eventData.event_id = event_id;

    if (Object.keys(customData).length > 0) eventData.custom_data = customData;

    const eventPayload = { data: [eventData] };

    console.log("Sending to Meta CAPI:", JSON.stringify(eventPayload));

    const metaUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

    const metaResponse = await fetch(metaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    const metaBody = await metaResponse.text();
    console.log("Meta CAPI response:", metaResponse.status, metaBody);

    if (!metaResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Meta CAPI error", details: metaBody }),
        { status: metaResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, meta_response: JSON.parse(metaBody) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
