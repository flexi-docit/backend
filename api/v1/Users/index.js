const express = require("express");
const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware.js");
const users = require("../../../controllers/User.controller.js");

router.get("/:id", authMiddleware, users.getUserById);

module.exports = router;
