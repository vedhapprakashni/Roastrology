import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RoastRequest {
  zodiacSign: string;
  traits: string[];
  nickname?: string;
  intensity?: number;
}

const intensityLevels = [
  { name: "Gentle", description: "Be sweet but slightly teasing. Keep it light and playful like a friendly nudge." },
  { name: "Playful", description: "Be witty and fun. Tease them like a best friend would - loving but pointed." },
  { name: "Spicy", description: "Get sassy! Call them out but keep it entertaining. More bite but still funny." },
  { name: "Savage", description: "Go hard! Be brutally honest and drag them through the cosmic mud. No holding back." },
  { name: "No Mercy", description: "DESTROY them completely. Maximum chaos energy. Scorched earth policy. Make them question their entire existence." },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { zodiacSign, traits, nickname, intensity = 2 } = await req.json() as RoastRequest;
    
    console.log(`Generating ${intensityLevels[intensity].name} roast for ${zodiacSign}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const nameReference = nickname ? `The victim's name is "${nickname}". Reference their name occasionally in the roast for extra personalization.` : "";
    const intensityGuide = intensityLevels[intensity];

    const systemPrompt = `You are Roastrology, the most creative zodiac roaster in the cosmos. Your mission is to roast people based on their zodiac sign in a way that's hilarious, relatable, and makes them go "OMG that's so true 😭". 

INTENSITY LEVEL: ${intensityGuide.name}
${intensityGuide.description}

Your style:
- Gen Z energy with modern slang (slay, bestie, no cap, fr fr, the way, etc.)
- Use emojis naturally but don't overdo it ✨💀🔥
- Reference current trends, social media behavior, and dating culture
- Be specific and personal - not generic horoscope vibes
- ${intensity >= 3 ? "Be BRUTAL and call them OUT" : "Balance burns with oddly accurate observations"}
- The roast should feel like ${intensity >= 3 ? "getting absolutely destroyed by the universe" : "a friend calling you out with love"}
- Include at least 3 specific scenarios or behaviors
- End with a dramatic ${intensity >= 4 ? "soul-crushing" : "mic drop"} moment

Structure: Write 3 paragraphs. Each paragraph should be 3-5 sentences. Make it LONG and DETAILED.`;

    const userPrompt = `Roast a ${zodiacSign} based on these personality traits: ${traits.join(", ")}.

${nameReference}

Remember the intensity is ${intensityGuide.name}! ${intensity >= 3 ? "DRAG THEM." : "Have fun with it."} Reference their sign's typical behaviors, relationship patterns, and life choices. Include specific examples and scenarios that will make them feel personally attacked (in a fun way). Use Gen Z language and emojis throughout.`;

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
        temperature: 0.85 + (intensity * 0.03), // Higher intensity = more creative
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

    console.log(`Successfully generated ${intensityGuide.name} roast for ${zodiacSign}`);

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
