const express = require("express")
const router = express.Router()
const { handleRewrite } = require("../controllers/rewrite")

router.post("/", handleRewrite)

module.exports = router
