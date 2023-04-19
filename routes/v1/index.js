const express = require("express");
const router = express.Router();

const auth = require("./Auth/index.js");
const project = require("./Projects/index.js");
const modules = require("./Modules/index.js");
const tags = require("./Tags/index.js");
const module_tags = require("./Module Tags/index.js");
const document = require("./Document/index.js");

router.get("/", (req, res) => {
  res.send({ status: true, message: "Welcome to Blog Apis!" });
});

router.use("/auth", auth);
router.use("/project", project);
router.use("/module", modules);
router.use("/module/tag", module_tags);
router.use("/tag", tags);
router.use("/document", document);

module.exports = router;
