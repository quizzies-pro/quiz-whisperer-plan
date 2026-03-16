import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("RDSTATION_API_TOKEN");
    if (!token) {
      console.error("RDSTATION_API_TOKEN not configured");
      return new Response(JSON.stringify({ error: "Token not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { name, email, phone, answers } = body;

    // Basic validation
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Consolidate quiz answers into a single custom field
    const quizSummary = [
      `Objetivo: ${answers?.["5"] || "N/A"}`,
      `Experiência: ${answers?.["6"] || "N/A"}`,
      `Tempo: ${answers?.["7"] || "N/A"}`,
      `Investimento: ${answers?.["9"] || "N/A"}`,
    ].join(" | ");

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "quiz-locagora",
        email,
        name,
        personal_phone: phone || "",
        cf_quiz_locagora: quizSummary,
        cf_plug_opportunity_origin: "Quiz LocaGora",
      },
    };

    console.log("Sending to RD Station:", JSON.stringify(payload));

    const rdResponse = await fetch(
      "https://api.rd.services/platform/conversions?api_key=" + token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const rdBody = await rdResponse.text();
    console.log("RD Station response:", rdResponse.status, rdBody);

    if (!rdResponse.ok) {
      return new Response(
        JSON.stringify({ error: "RD Station error", details: rdBody }),
        {
          status: rdResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
