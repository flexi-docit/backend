const express = require("express");
const router = express.Router();

const auth = require("./Auth/index.js");
const project = require("./Projects/index.js");
const modules = require("./Modules/index.js");
const module_tags = require("./Module Tags/index.js");

router.get("/", (req, res) => {
  res.send({ status: true, message: "Welcome to Blog Apis!" });
});

router.use("/auth", auth);
router.use("/project", project);
router.use("/module", modules);
router.use("/tag", module_tags);

module.exports = router;
