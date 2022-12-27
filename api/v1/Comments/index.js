const express = require("express");
const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware.js");

const comments = require("../../../controllers/Comments.controller.js");

router.get("/", comments.getAllComments);

router.get("/:id", comments.getCommentById);

router.post("/", authMiddleware, comments.createComment);

router.put("/:id", authMiddleware, comments.editComment);

router.delete("/:id", authMiddleware, comments.deleteCommentById);

module.exports = router;
