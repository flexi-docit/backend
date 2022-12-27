const express = require("express");
const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware.js");
const post = require("../../../controllers/Post.controller.js");

router.get("/:id", post.getPostById);

router.get("/", post.getAllPosts);

router.post("/", authMiddleware, post.createPost);

router.put("/:id", authMiddleware, post.updatePostById);

router.delete("/:id", authMiddleware, post.deletePostById);

module.exports = router;
