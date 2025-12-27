import OpenAI from "openai";
import { ethers } from "ethers";

const aiClient = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseUrl: "https://ai-gateway.vercel.sh/v1"
});

// Ethereum provider（Metamask）
const provider = new ethers.BrowserProvider(window.ethereum);

export async function askAI(message) {
  try {
    const response = await aiClient.chat.completions.create({
      model: "xai/grok-4",
      messages: [{ role: "user", content: message }]
    });
    return response.choices?.[0]?.message?.content || "No response";
  } catch (e) {
    console.error("AI Gateway Error:", e);
    return "Error contacting AI Gateway";
  }
}

export async function sendCrypto(to, amount) {
  try {
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({ to, value: ethers.parseEther(amount) });
    return tx.hash;
  } catch (e) {
    console.error("Web3 Error:", e);
    return "Transaction failed";
  }
}
