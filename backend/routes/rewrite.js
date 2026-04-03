import express from "express"
import { handleRewrite } from "../controllers/rewrite.js"
import { rewriteWithHuggingFace } from "../services/huggingface.js"
import { buildRewritePrompt } from "../utils/promptBuilder.js"

const router = express.Router()
router.post("/", handleRewrite)
router.get("/test", async (req, res) => {
  const prompt = buildRewritePrompt(
    "Welcome to Puppydog! In this demo, we’ll show you how to create a personalized video.",
    "AI-powered video creation",
    "Target audience is small business owners"
  )

  try {
    const result = await rewriteWithHuggingFace(prompt)
    res.json({ rewrittenScript: result })
  } catch (err) {
    res.status(500).json({ error: "Model failed", details: err.message })
  }
})

export default router
