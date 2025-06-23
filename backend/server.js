// backend/server.js
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const rewriteRoutes = require("./routes/rewrite")

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use("/api/rewrite", rewriteRoutes)

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
