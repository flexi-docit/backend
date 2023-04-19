const express = require("express");
const router = express.Router();

const authMiddlewere = require("../../../middlewares/auth.middleware.js");

const moduleControllers = require("../../../controllers/Module.controller.js");

// revoke access to a developer from a module
router.delete(
  "/developer",
  authMiddlewere(["Module Lead"]),
  moduleControllers.removeDeveloperFromModule
);

// delete module by id
router.delete(
  "/:id",
  authMiddlewere(["Team Lead"]),
  moduleControllers.deleteModuleById
);

// grant access to a developer to a module
router.post(
  "/developer",
  authMiddlewere(["Module Lead", "Team Lead"]),
  moduleControllers.addDeveloperToModule
);

// list all developers of a module
router.get(
  "/developer",
  authMiddlewere(["Module Lead", "Team Lead"]),
  moduleControllers.getAllDevelopersOfModule
);

// create a new module
router.post("/", authMiddlewere(["Team Lead"]), moduleControllers.createModule);

// get all modules of a project
router.get("/", authMiddlewere(["Team Lead", "Module Lead"]), moduleControllers.getAllModules);

// get module by id
router.get(
  "/:id",
  authMiddlewere(["Team Lead", "Module Lead"]),
  moduleControllers.getModuleById
);

// update module details by id
router.patch(
  "/:id",
  authMiddlewere(["Team Lead"]),
  moduleControllers.updateModuleById
);

module.exports = router;
