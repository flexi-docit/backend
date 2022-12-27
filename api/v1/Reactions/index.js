const express = require("express");
const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware.js");
const reaction = require("../../../controllers/Reaction.controller.js");

router.post("/like", authMiddleware, reaction.like);

router.post("/unlike", authMiddleware, reaction.unlike);

module.exports = router;
