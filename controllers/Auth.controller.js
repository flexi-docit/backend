const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isStrongPassword } = require("../utils/checks.js");
const db = require("../models/index.js");
const User = db.User;
const sequelize = db.sequelize;

exports.signup = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { username, password, name } = req.body;
      if (
        username &&
        password &&
        name &&
        username.length > 0 &&
        password.length > 0 &&
        name.length > 5
      ) {
        if (isStrongPassword(password)) {
          const user = await User.findOne({
            where: { username: username },
            transaction: transaction,
          });

          if (!user) {
            const newUser = await User.create(
              {
                username: username,
                password: bcrypt.hashSync(password, 10),
                name: name,
              },
              { transaction: transaction }
            );

            delete newUser.dataValues.password;

            res.status(200).json({
              message: "User created",
              user: newUser,
            });
          } else {
            next(createError(400, "Username already exists"));
          }
        } else {
          next(createError(400, "Password is not strong enough"));
        }
      } else {
        next(createError(400, "Missing or invalid required fields"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.login = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { username, password } = req.body;

      if (username && password && username.length > 0 && password.length > 0) {
        const user = await User.findOne({
          where: { username: username },
          transaction: transaction,
        });
        console.log(user.dataValues);
        if (user) {
          const isPasswordValid = bcrypt.compareSync(
            password,
            user.dataValues.password
          );
          if (isPasswordValid) {
            const token = jwt.sign(
              { id: user.dataValues.id, createdAt: Date.now() },
              process.env.JWT_SECRET,
              {
                expiresIn: 86400, // 24 hours
              }
            );

            res.status(200).json({
              ok: true,
              message: "User logged in",
              token: token,
            });
          } else {
            next(createError(400, "Invalid password"));
          }
        } else {
          next(createError(400, "User does not exist"));
        }
      } else {
        next(createError(400, "Missing or invalid required fields"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
