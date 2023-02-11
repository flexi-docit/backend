const express = require("express");
const router = express.Router();

const authController = require("../../../controllers/Auth.controller.js");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/confirm/email", authController.verifyEmail);

router.post("/reset-password/:token", authController.forgotPassword);

module.exports = router;
