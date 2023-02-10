const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const isValidEmail = require("../validators/email.js");
const isValidPassword = require("../validators/password.js");
const Users = db.Users;

exports.login = async (req, res, next) => {
  console.log(process.env);
  try {
    await sequelize.transaction(async (transaction) => {
      const { email, password } = req.body;

      if (isValidEmail(email) && isValidPassword(password)) {
        const user = await Users.findOne({
          where: {
            email: email,
          },
          transaction,
        });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            res.status(200).json({
              status: true,
              message: "Login successful",
              data: {
                token: jwt.sign(
                  {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    generatedAt: Date.now(),
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1y",
                  }
                ),
                role: user.role,
                id: user.id,
              },
            });
          } else {
            next(createError(401, "Invalid credentials"));
          }
        } else {
          next(createError(404, "User not found"));
        }
      } else {
        next(createError(400, "Invalid email or password"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.register = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { fullName, email, password, role } = req.body;

      if (isValidEmail(email) && isValidPassword(password)) {
        const userData = {
          fullName,
          email,
          password: await bcrypt.hash(password, 12),
          role,
        };

        const user = await Users.findOrCreate({
          where: {
            email: email,
          },
          defaults: userData,
          transaction,
        });

        if (user) {
          res.send({ status: true, message: "User registered successfully" });
        } else {
          next(createError(500, "User registration failed"));
        }
      } else {
        next(createError(400, "Invalid email or password"));
      }
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
