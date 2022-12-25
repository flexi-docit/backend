const createError = require("http-errors");
const db = require("../models/index.js");
const User = db.User;
const sequelize = db.sequelize;

exports.getUserById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id: id,
        },
        transaction,
      });
      if (user) {
        delete user.dataValues.password;
        res.status(200).send({
          ok: true,
          message: "User found",
          user: user,
        });
      } else {
        next(createError(404, "User not found"));
      }
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
