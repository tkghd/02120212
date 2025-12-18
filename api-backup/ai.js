export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const key = process.env.OPENAI_API_KEY;
  const { prompt } = req.body || {};

  if (!key) {
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: "OpenAI API error", 
        details: data 
      });
    }

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response",
      usage: data.usage
    });
  } catch (error) {
    return res.status(500).json({ 
      error: "Internal server error", 
      message: error.message 
    });
  }
}
