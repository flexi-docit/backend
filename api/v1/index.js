const express = require("express");
const router = express.Router();

const auth = require("./Auth/index.js");
const post = require("./Posts/index.js");
const user = require("./Users/index.js");

router.get("/", (req, res) => {
  res.send({ ok: true, message: "Welcome to Blog Apis!" });
});

router.use("/auth", auth);
router.use("/post", post);
router.use("/users", user);

module.exports = router;
