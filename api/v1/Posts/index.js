const express = require("express");
const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware.js");
const post = require("../../../controllers/Post.controller.js");

router.post("/", authMiddleware, post.createPost);

module.exports = router;
