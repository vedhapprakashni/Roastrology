import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RoastRequest {
  zodiacSign: string;
  traits: string[];
  nickname?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { zodiacSign, traits, nickname } = await req.json() as RoastRequest;
    
    console.log(`Generating roast for ${zodiacSign} with traits: ${traits.join(", ")}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const nameReference = nickname ? `The victim's name is "${nickname}". Reference their name occasionally in the roast for extra personalization.` : "";

    const systemPrompt = `You are Roastrology, the most savage zodiac roaster in the cosmos. Your mission is to absolutely DESTROY people based on their zodiac sign in a way that's hilarious, relatable, and makes them go "OMG that's so true 😭". 

Your style:
- Gen Z energy with modern slang (slay, bestie, no cap, fr fr, the way, etc.)
- Use emojis liberally but naturally 💀🔥✨
- Reference current trends, social media behavior, and dating culture
- Be specific and personal - not generic horoscope vibes
- Balance savage burns with oddly accurate observations
- The roast should feel like a friend calling you out
- Include at least 3 specific scenarios or behaviors
- End with a dramatic mic drop moment

Structure: Write 3 paragraphs. Each paragraph should be 3-5 sentences. Make it LONG and DETAILED. No mercy.`;

    const userPrompt = `Roast a ${zodiacSign} based on these personality traits: ${traits.join(", ")}.

${nameReference}

Remember to be SAVAGE but funny. Reference their sign's typical behaviors, relationship patterns, and life choices. Include specific examples and scenarios that will make them feel personally attacked (in a fun way). Use Gen Z language and emojis throughout.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1000,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment! ⏳" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later! 🌟" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const roast = data.choices?.[0]?.message?.content;

    if (!roast) {
      throw new Error("No roast generated");
    }

    console.log(`Successfully generated roast for ${zodiacSign}`);

    return new Response(
      JSON.stringify({ roast }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating roast:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate roast. The stars are not aligned! 🌌" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
