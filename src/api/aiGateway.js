import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseUrl: "https://ai-gateway.vercel.sh/v1"
});

export async function askAI(message) {
  try {
    const response = await client.chat.completions.create({
      model: "xai/grok-4",
      messages: [{ role: "user", content: message }]
    });
    return response.choices?.[0]?.message?.content || "No response";
  } catch (e) {
    console.error("AI Gateway Error:", e);
    return "Error contacting AI Gateway";
  }
}
