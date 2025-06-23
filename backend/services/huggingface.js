const axios = require("axios")

const rewriteWithHuggingFace = async (prompt, model) => {
  const HF_API_URL = `https://api-inference.huggingface.co/models/${model}`
  const response = await axios.post(
    HF_API_URL,
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      timeout: 60_000,
    }
  )

  return response.data?.[0]?.generated_text || "No response from model"
}

module.exports = { rewriteWithHuggingFace }
