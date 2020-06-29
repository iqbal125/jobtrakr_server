const express = require("express");
const router = express();

const requireAuth = require("../passport").requireAuth;
const userController = require("../controllers");

router.get("/private", requireAuth, userController.privateRoute);
router.post("/sendToken", userController.sendToken);

module.exports = router;
