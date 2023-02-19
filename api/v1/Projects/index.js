const express = require("express");
const router = express.Router();

const projectsController = require("../../../controllers/Project.controller.js");
const authMiddleware = require("../../../middlewares/auth.middleware.js");

// create a new project
router.post(
  "/",
  authMiddleware(["Team Lead"]),
  projectsController.createProject
);

// get all projects with or without lead_id
router.get(
  "/",
  authMiddleware(["Team Lead"]),
  projectsController.getAllProjects
);

// get project by id
router.get(
  "/:id",
  authMiddleware(["Team Lead"]),
  projectsController.getProjectById
);

router.patch(
  "/:id",
  authMiddleware(["Team Lead"]),
  projectsController.updateProjectById
);

router.delete(
  "/:id",
  authMiddleware(["Team Lead"]),
  projectsController.deleteProjectById
);

module.exports = router;
