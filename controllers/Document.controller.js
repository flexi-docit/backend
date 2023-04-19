const fs = require("fs");
const createError = require("http-errors");
const db = require("../models/index.js");
const path = require("path");
const Documents = db.Documents;
const Modules = db.Modules;
const sequelize = db.sequelize;

exports.upsertDocument = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { module_id, content } = req.body;

      console.log(req.body);
      // create new document
      await Documents.upsert(
        {
          markdown: content,
          module_id,
        },
        { transaction }
      );
      res.send({ status: true });
      // } else {
      //   next(createError(400, "Content cannot be empty"));
      // }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.getDocument = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;

      const document = await Documents.findOne({
        where: {
          module_id: id,
        },
        transaction,
      });

      if (document) {
        res.json({ markdown: document.markdown });
      } else {
        next(createError(400, "Module not found"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
