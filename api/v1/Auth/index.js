const express = require("express");
const router = express.Router();

const authController = require("../../../controllers/Auth.controller.js");

// send role and id inside jwt token
router.get("/decode-jwt", authController.decodeJWT);

// login user and send token with role and id
router.post("/login", authController.login);

// register a user(for development purpose only now)
router.post("/register", authController.register);

// send email after validation of user for password reset
router.post("/confirm/email", authController.verifyEmail);

// reset password
router.post("/reset-password/:token", authController.forgotPassword);

module.exports = router;
