const { rewriteWithHuggingFace } = require("../services/huggingface")
const { buildRewritePrompt } = require("../utils/promptBuilder")

const handleRewrite = async (req, res) => {
  const { originalScript, videoTopic, additionalInfo, model } = req.body

  if (!originalScript || !model) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const prompt = buildRewritePrompt(originalScript, videoTopic, additionalInfo)

  try {
    const result = await rewriteWithHuggingFace(prompt, model)
    res.json({ rewrittenScript: result })
  } catch (err) {
    res
      .status(500)
      .json({ error: "Model failed to respond", details: err.message })
  }
}

module.exports = { handleRewrite }
