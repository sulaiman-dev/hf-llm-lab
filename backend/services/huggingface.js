import { InferenceClient } from "@huggingface/inference"

const HF_TOKEN = process.env.HF_TOKEN
const client = new InferenceClient(HF_TOKEN)

export const rewriteWithHuggingFace = async (prompt) => {
  try {
    const response = await client.textGeneration({
      model: "HuggingFaceTB/SmolLM3-3B", // or "katanemo/Arch-Router-1.5B"
      inputs: prompt,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
      },
    })

    return response.generated_text || "No response"
  } catch (err) {
    console.error("❌ Hugging Face Error:", err.response?.data || err.message)
    throw new Error("Model failed to respond or is unavailable")
  }
}
