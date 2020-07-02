const express = require("express")
const router = express()

const requireAuth = require("../passport").requireAuth
const userController = require("../controllers")

router.post("/sendToken", userController.sendToken)

module.exports = router
