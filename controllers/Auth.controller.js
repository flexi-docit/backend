const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const isValidEmail = require("../validators/email.js");
const isValidPassword = require("../validators/password.js");
const Users = db.Users;

exports.decodeJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET);

      res.status(200).json({
        status: true,
        message: "JWT decoded!",
        data: {
          role: tokenData.role,
          id: tokenData.id,
        },
      });
    } catch (err) {
      console.log(err);
      return next(createError(401, "Invalid Token"));
    }
  } else return next(createError(401, "Token Not Found"));
};

exports.login = async (req, res, next) => {
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

exports.forgotPassword = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { token } = req.params;
      const { password } = req.body;

      if (isValidPassword(password)) {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenData) {
          const user = await Users.findOne({
            where: {
              id: tokenData.id,
              email: tokenData.email,
            },
            transaction,
          });

          if (user) {
            user.password = await bcrypt.hash(password, 12);
            const result = await user.save({ transaction });

            if (result) {
              res.send({
                status: true,
                message: "Password reset successful",
              });
            } else {
              next(createError(500, "Password reset failed"));
            }
          } else {
            next(createError(404, "User not found"));
          }
        } else {
          next(createError(401, "Invalid token"));
        }
      } else {
        next(createError(400, "Invalid password"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { email } = req.body;

      if (isValidEmail(email)) {
        const user = await Users.findOne({
          where: {
            email: email,
          },
          transaction,
        });

        if (user) {
          // mail reset password link
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              generatedAt: Date.now(),
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "10m",
            }
          );

          const emailQueue = require("../queues/email.queue.js");

          emailQueue.add({
            to: user.email,
            token,
          });

          res.send({
            status: true,
            message: "Email sent successfully",
          });

          // const emailStatus = await sendResetPassword(user.email, token);

          // if (emailStatus) {
          //   res
          //     .status(200)
          //     .send({ status: true, message: "Email sent successfully" });
          // } else {
          //   next(createError(500, "Email sending failed"));
          // }
        } else {
          next(createError(404, "User not found"));
        }
      } else {
        next(createError(400, "Invalid email"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
