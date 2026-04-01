// src/components/RewriteForm.jsx
import { useState } from "react"
import axios from "axios"

const models = [
  { label: "SmolLM3", value: "HuggingFaceTB/SmolLM3-3B" },
  { label: "Arch-Router", value: "katanemo/Arch-Router-1.5B" },
]

function RewriteForm() {
  const [originalScript, setOriginalScript] = useState("")
  const [videoTopic, setVideoTopic] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [model, setModel] = useState(models[0].value)
  const [rewrittenScript, setRewrittenScript] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setRewrittenScript("")
    try {
      const res = await axios.post("http://localhost:3001/api/rewrite", {
        originalScript,
        videoTopic,
        additionalInfo,
        model,
      })
      setRewrittenScript(res.data.rewrittenScript)
    } catch (err) {
      setRewrittenScript("Error: " + err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full border p-2 rounded"
        rows={6}
        placeholder="Original script..."
        value={originalScript}
        onChange={(e) => setOriginalScript(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Video topic"
        value={videoTopic}
        onChange={(e) => setVideoTopic(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Additional info"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {models.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Rewriting..." : "Rewrite Script"}
      </button>

      {rewrittenScript && (
        <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          {rewrittenScript}
        </div>
      )}
    </div>
  )
}

export default RewriteForm
