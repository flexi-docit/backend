const createError = require("http-errors");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const Tags = db.Tags;

exports.createTag = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { name } = req.body;

      if (name && name.trim().length > 0) {
        const tag = await Tags.create(
          {
            name: name,
          },
          transaction
        );

        res.send({ status: true, data: { tag_id: tag.id } });
      } else {
        next(createError(400, "Invalid tag name"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
      const { id } = req.params;

      if (id && id > 0) {
        const tag = await Tags.findOne({
          where: {
            id: id,
          },
          transaction,
        });

        if (tag) {
          await tag.destroy();

          res.send({ status: true, message: "Tag deleted successfully" });
        } else {
          next(createError(404, "Tag not found"));
        }
      } else {
        next(createError(400, "Invalid tag id"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
