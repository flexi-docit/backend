const createError = require("http-errors");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const User = db.User;
const Post = db.Post;
const Reaction = db.Reaction;

exports.like = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { post_id } = req.body;

      if (post_id) {
        const post = await Post.findOne({
          where: {
            id: post_id,
          },
          transaction,
        });

        if (post) {
          const reaction = await Reaction.findOne({
            where: {
              post_id: post_id,
              user_id: req.user.id,
            },
            transaction,
          });
          if (!reaction) {
            await Reaction.create(
              {
                user_id: req.user.id,
                post_id: post_id,
              },
              {
                transaction,
              }
            );
            res.status(200).send({
              ok: true,
              message: "Post liked successfully",
            });
          } else {
            next(createError(400, "Post already liked"));
          }
        } else {
          next(createError(400, "Post not found"));
        }
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.unlike = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { post_id } = req.body;

      if (post_id) {
        const post = await Post.findOne({
          where: {
            id: post_id,
          },
          transaction,
        });

        if (post) {
          const reaction = await Reaction.findOne({
            where: {
              post_id: post_id,
              user_id: req.user.id,
            },
            transaction,
          });
          if (reaction) {
            await Reaction.destroy({
              where: {
                post_id: post_id,
                user_id: req.user.id,
              },
              transaction,
            });
            res.status(200).send({
              ok: true,
              message: "Post unliked successfully",
            });
          } else {
            next(createError(400, "Post not liked"));
          }
        } else {
          next(createError(400, "Post not found"));
        }
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
