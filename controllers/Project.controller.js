const createError = require("http-errors");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const Projects = db.Projects;
const Users = db.Users;

exports.createProject = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { name, description } = req.body;
      if (
        name &&
        name.trim().length > 0 &&
        description &&
        description.trim().length > 0
      ) {
        const projectData = { name, description, lead_id: req.user.id };

        const project = await Projects.create(projectData, {
          transaction: transaction,
        });

        if (project) {
          res.send({
            status: true,
            message: "Project created successfully",
            data: { project_id: project.id },
          });
        } else {
          next(createError(500, "Project creation failed"));
        }
      } else {
        next(createError(400, "Invalid project name or description"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { _limit = 10, _page = 1, lead_id = null } = req.query;
      const condition = {};
      if (lead_id && lead_id > 0) {
        condition.lead_id = lead_id;
      }
      const projects = await Projects.findAndCountAll({
        where: condition,
        attributes: {
          exclude: ["lead_id"],
        },
        transaction: transaction,
        include: [
          {
            model: Users,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
        limit: _limit,
        offset: (_page - 1) * _limit,
      });

      res.send({ status: true, data: projects });
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { id } = req.params;

      if (id && id > 0) {
        const project = await Projects.findOne({
          where: { id },
          attributes: {
            exclude: ["lead_id"],
          },
          transaction: transaction,
          include: [
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        });
        if (project) {
          res.send({ status: true, data: project });
        } else {
          next(createError(400, "Invalid project id"));
        }
      } else {
        next(createError(400, "Invalid project id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.updateProjectById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { id } = req.params;
      if (id && id > 0) {
        const project = await Projects.findOne({
          where: { id },
          transaction,
        });

        if (project) {
          if (project.lead_id === req.user.id) {
            const { name, description } = req.body;
            const updatedProjectData = {};

            if (name && name.trim().length > 0) {
              updatedProjectData.name = name;
            }

            if (description && description.trim().length > 0) {
              updatedProjectData.description = description;
            }

            const result = await Projects.update(updatedProjectData, {
              where: {
                id: id,
              },
              transaction,
            });

            if (result) {
              res.send({
                status: true,
                message: "Project details updated successfully",
              });
            } else {
              next(
                createError(
                  500,
                  "Something went wrong, cannot update project details"
                )
              );
            }
          } else {
            next(createError(403, "Access Denied"));
          }
        } else {
          next(createError(404, "Project not found"));
        }
      } else {
        next(createError(400, "Invalid project id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.deleteProjectById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { id } = req.params;
      if (id && id > 0) {
        const project = await Projects.findOne({
          where: { id },
          transaction,
        });

        if (project) {
          if (project.lead_id === req.user.id) {
            await Projects.destroy({
              where: { id },
              transaction,
            });
            res.send({ status: true, message: "Project deleted successfully" });
          } else {
            next(createError(403, "Access Denied"));
          }
        } else {
          next(createError(404, "Project not found"));
        }
      } else {
        next(createError(400, "Invalid project id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
