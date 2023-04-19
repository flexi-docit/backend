const express = require("express");
const router = express.Router();

const authMiddlewere = require("../../../middlewares/auth.middleware.js");
const documentController = require("../../../controllers/Document.controller.js");

// create new document
router.post(
  "/",
  authMiddlewere(["Module Lead", "Team Lead"]),
  documentController.upsertDocument
);

router.get(
  "/:id",
  authMiddlewere(["Module Lead", "Team Lead"]),
  documentController.getDocument
);

module.exports = router;
