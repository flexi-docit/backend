const fs = require("fs");
const createError = require("http-errors");
const db = require("../models/index.js");
const Documents = db.Documents;
const Modules = db.Modules;
const sequelize = db.sequelize;

exports.createDocument = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { module_id, content } = req.body;
      const path = `public/documents/${new Date().getTime()}_${module_id}.md`;

      if (content && content.length > 0) {
        const module = await Modules.findOne({
          where: {
            id: module_id,
          },
          transaction,
        });

        if (module) {
          // write content inside public/documents/<time stamp>_<module_id>.md
          await fs.promises.writeFile(path, content);

          // create new document
          await Documents.create(
            {
              path,
              module_id,
            },
            { transaction }
          );

          res.send({ status: true });
        } else {
          next(createError(400, "Content cannot be empty"));
        }
      } else {
        next(createError(404, "Module not found"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
