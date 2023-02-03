const createError = require("http-errors");

exports.login = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.logout = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // Your code here
    });
  } catch (err) {
    next(createError(500, err));
  }
};
