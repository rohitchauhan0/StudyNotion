const express = require("express")
const { createContact } = require("../controllers/Contact")
const router = express.Router()
router.post("/contact", createContact)


module.exports = router
