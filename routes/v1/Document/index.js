const express = require("express");
const router = express.Router();

const authMiddlewere = require("../../../middlewares/auth.middleware.js");
const documentController = require("../../../controllers/Document.controller.js");

// create new document
router.post(
  "/",
  authMiddlewere(["Module Lead"]),
  documentController.createDocument
);

module.exports = router;
