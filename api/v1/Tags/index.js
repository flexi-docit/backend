const express = require("express");
const router = express.Router();

const authmiddlewere = require("../../../middlewares/auth.middleware.js");
const tags = require("../../../controllers/Tags.controller.js");

// create new module tag
router.post("/", authmiddlewere(["Team Lead"]), tags.createTag);

// delete a tag
router.delete("/:id", authmiddlewere(["Team Lead"]), tags.deleteTag);

module.exports = router;
