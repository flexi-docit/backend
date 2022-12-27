const createError = require("http-errors");
const db = require("../models/index.js");
const User = db.User;
const Post = db.Post;
const sequelize = db.sequelize;
const Comment = db.Comment;

exports.getAllComments = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { post_id } = req.query;
      if (post_id) {
        const comments = await Comment.findAll({
          where: {
            post_id: post_id,
          },
          attributes: {
            exclude: ["user_id", "post_id"],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Post,
            },
          ],
        });
        res.status(200).send({
          ok: true,
          message: "Comments fetched successfully",
          comments: comments,
        });
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.createComment = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { post_id, content } = req.body;

      if (post_id && content && content.length > 0) {
        const post = await Post.findOne({
          where: {
            id: post_id,
          },
          transaction,
        });

        if (post) {
          await Comment.create(
            {
              content: content,
              user_id: req.user.id,
              post_id: post_id,
            },
            { transaction }
          );
          res.status(201).send({
            ok: true,
            message: "Comment created successfully",
          });
        } else {
          next(createError(404, "Post not found"));
        }
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;

      const comment = await Comment.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["user_id", "post_id"],
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Post,
          },
        ],
        transaction,
      });

      if (comment) {
        res.status(200).send({
          ok: true,
          message: "Comment fetched successfully",
          comment: comment,
        });
      } else {
        next(createError(404, "Comment not found"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.editComment = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;
      const { content } = req.body;

      if (id && content && content.length > 0) {
        const comment = await Comment.findOne({
          where: {
            id: id,
          },
          transaction,
        });
        if (comment) {
          if (comment.user_id === req.user.id) {
            await Comment.update(
              {
                content: content,
              },
              {
                where: {
                  id: id,
                },
                transaction,
              }
            );
            res.status(200).send({
              ok: true,
              message: "Comment updated successfully",
            });
          } else {
            next(
              createError(403, "You are not authorized to edit this comment")
            );
          }
        } else {
          next(createError(404, "Comment not found"));
        }
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.deleteCommentById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;

      if (id) {
        const comment = await Comment.findOne({
          where: {
            id: id,
          },
          transaction,
        });

        if (comment) {
          if (comment.user_id === req.user.id) {
            await Comment.destroy({
              where: {
                id: id,
              },
              transaction,
            });
            res.status(200).send({
              ok: true,
              message: "Comment deleted successfully",
            });
          } else {
            next(
              createError(403, "You are not authorized to delete this comment")
            );
          }
        } else {
          next(createError(404, "Comment not found"));
        }
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (err) {
    next(createError(500, err));
  }
};
