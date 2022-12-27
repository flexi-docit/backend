const express = require("express");
const router = express.Router();

const auth = require("./Auth/index.js");
const post = require("./Posts/index.js");
const user = require("./Users/index.js");
const comments = require("./Comments/index.js");

const authMiddleware = require("../../middlewares/auth.middleware.js");
const reactions = require("../../controllers/Reaction.controller.js");

router.get("/", (req, res) => {
  res.send({ ok: true, message: "Welcome to Blog Apis!" });
});

router.use("/auth", auth);
router.use("/post", post);
router.use("/users", user);
router.use("/comments", comments);

router.post("/like", authMiddleware, reactions.like);
router.post("/unlike", authMiddleware, reactions.unlike);

module.exports = router;
