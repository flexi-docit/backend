const createError = require("http-errors");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const Projects = db.Projects;
const Modules = db.Modules;
const Users = db.Users;
const Tags = db.Tags;
const Op = db.Sequelize.Op;

// create a module and promote user(module lead)
exports.createModule = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // data extraction and basic validation
      const { name, description, project_id, module_lead_id, tagList } =
        req.body;

      if (
        name &&
        name.trim().length > 0 &&
        description &&
        description.trim().length > 0 &&
        project_id &&
        project_id > 0 &&
        module_lead_id &&
        module_lead_id > 0 &&
        tagList &&
        Array.isArray(tagList)
      ) {
        // fetch project details, list of tags(if present or not) and module lead data(user)
        const [projectModule, tags, module_lead] = await Promise.all([
          await Projects.findOne({
            where: { id: project_id },
            transaction,
          }),

          await Tags.findAll({
            where: {
              id: {
                [Op.in]: tagList,
              },
            },
            transaction,
          }),

          await Users.findOne({
            where: {
              id: module_lead_id,
            },
            transaction,
          }),
        ]);

        if (projectModule && module_lead && tags.length === tagList.length) {
          const moduleData = await Modules.create(
            {
              name: name,
              description: description,
              lead_id: module_lead_id,
              project_id: project_id,
            },
            transaction
          );
          // await Module_Tags.bulkCreate(
          //   tagList.map((item) => {
          //     return {
          //       module_id: moduleData.id,
          //       tag_id: item,
          //     };
          //   }),
          //   {
          //     transaction,
          //   }
          // );

          // modify user data if required
          if (module_lead.role === "Developer") {
            module_lead.role = "Module Lead";
            await module_lead.save({ transaction });
          }
          res.send({
            status: true,
            message: "Module created successfully",
            data: { module_id: moduleData.id },
          });
        } else {
          next(createError(404, "Invalid module details"));
        }
      } else {
        next(createError(400, "Invalid/Insufficient data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

/**
 *
 * @param {project_id, lead_id}* req.query
 * @param {status} req.query
 * 
 * get all modules:
     Of a project
     Of a Module Lead
 */
exports.getAllModules = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // get details of modules where by default module lead is current user
      const {
        project_id,
        lead_id = req.user.role === "Module Lead" && req.user.id,
        status,
      } = req.query;
      if ((project_id && project_id > 0) || (lead_id && lead_id > 0)) {
        const where = {};
        const options = {
          transaction,
          include: [
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Projects,
              attributes: {
                exclude: ["lead_id"],
              },
            },
          ],
          attributes: {
            exclude: ["lead_id"],
          },
        };

        if (project_id) {
          where.project_id = project_id;
        }

        if (lead_id) {
          where.lead_id = lead_id;
        }

        if (status && status.trim().length > 0) {
          where.status = status;
          options.paranoid = false;
        }

        const modules = await Modules.findAll({
          where: where,
          ...options,
        });

        if (modules) {
          res.send({ status: true, data: modules });
        } else {
          next(createError(404, "Project not found"));
        }
      } else {
        next(createError(400, "Invalid project id/lead id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.getModuleById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { id } = req.params;
      if (id && id > 0) {
        const moduleData = await Modules.findOne({
          where: { id },
          attributes: {
            exclude: ["lead_id"],
          },
          include: [
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Projects,
              attributes: {
                exclude: ["lead_id"],
              },
            },
          ],
          attributes: {
            exclude: ["project_id", "lead_id"],
          },
          transaction,
        });

        if (moduleData) {
          res.send({ status: true, data: moduleData });
        } else {
          next(createError(404, "Module not found"));
        }
      } else [next(createError(400, "Invalid Module id"))];
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.updateModuleById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { name, description, status, lead_id, project_id } = req.body;
      const { id } = req.params;

      if (id && id > 0) {
        const moduleData = await Modules.findOne({
          where: { id },
          transaction,
        });

        if (moduleData) {
          if (name && name.trim().length > 0) {
            moduleData.name = name;
          }

          if (description && description.trim().length > 0) {
            moduleData.description = description;
          }

          if (status && status.trim().length > 0) {
            moduleData.status = status;
          }

          if (lead_id && lead_id > 0) {
            moduleData.lead_id = lead_id;
          }

          if (project_id && project_id > 0) {
            moduleData.project_id = project_id;
          }

          await moduleData.save({ transaction });
          res.send({
            status: true,
            message: "Module data updated successfully",
          });
        } else {
          next(createError(404, "Module not found"));
        }
      } else {
        next(createError(400, "Invalid module id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.deleteModuleById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { id } = req.params;

      if (id && id > 0) {
        const moduleData = await Modules.findOne({
          where: {
            id: id,
          },
          transaction,
        });

        if (moduleData) {
          // update value of moduleData.status to archived and save it
          moduleData.status = "archived";
          await moduleData.save({ transaction });

          res.send({ status: true, message: "Module deleted successfully" });
        } else {
          next(createError(404, "Module not found"));
        }
      } else {
        next(createError(400, "Invalid module id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
