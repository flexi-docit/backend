const express = require("express");
const router = express.Router();

const authMiddlewere = require("../../../middlewares/auth.middleware.js");

const moduleControllers = require("../../../controllers/Module.controller.js");

// create a new module
router.post("/", authMiddlewere(["Team Lead"]), moduleControllers.createModule);

// get all modules of a project
router.get("/", authMiddlewere(["Team Lead"]), moduleControllers.getAllModules);

// get module by id
router.get(
  "/:id",
  authMiddlewere(["Team Lead"]),
  moduleControllers.getModuleById
);

// update module details by id
router.patch(
  "/:id",
  authMiddlewere(["Team Lead"]),
  moduleControllers.updateModuleById
);

// delete module by id
router.delete(
  "/:id",
  authMiddlewere(["Team Lead"]),
  moduleControllers.deleteModuleById
);

module.exports = router;
