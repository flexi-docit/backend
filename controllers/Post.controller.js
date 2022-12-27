const createError = require("http-errors");
const db = require("../models/index.js");
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;
const Reaction = db.Reaction;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

exports.createPost = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { title, content, category, keywords } = req.body;
      if (
        title &&
        content &&
        category &&
        keywords &&
        title.length > 0 &&
        content.length > 0 &&
        category.length > 0 &&
        keywords.length > 0 &&
        Array.isArray(keywords)
      ) {
        const postData = {
          title,
          content,
          category,
          keywords,
          user_id: req.user.id,
        };
        const post = await Post.create(postData, { transaction });

        res.status(201).json({
          ok: true,
          message: "Post created successfully",
          post: post,
        });
      } else {
        next(createError(400, "Insufficient Or Invalid data"));
      }
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;

      const post = await Post.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["user_id"],
        },

        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Comment,
          },
        ],
        transaction,
      });
      if (post) {
        res.status(200).json({
          ok: true,
          message: "Post fetched successfully",
          post: post,
        });
      } else {
        next(createError(404, "Post not found"));
      }
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;

      const post = await Post.findOne({
        where: {
          id: id,
        },
        transaction,
      });

      if (post) {
        const userId = post.user_id;

        if (userId === req.user.id) {
          await post.destroy({
            where: {
              id: id,
            },
            transaction,
          });
          res.status(200).json({
            ok: true,
            message: "Post deleted successfully",
          });
        } else {
          next(createError(403, "You are not authorized to delete this post"));
        }
      } else {
        next(createError(404, "Post not found"));
      }
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

exports.updatePostById = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const { id } = req.params;

      const { title, content, category, keywords } = req.body;

      const post = await Post.findOne({
        where: {
          id: id,
          user_id: req.user.id,
        },
      });

      if (post) {
        const data = {};

        if (title) {
          data.title = title;
        }

        if (content) {
          data.content = content;
        }

        if (category) {
          data.category = category;
        }

        if (keywords) {
          if (Array.isArray(keywords)) {
            data.keywords = keywords;
          } else {
            next(createError(400, "Keywords must be an array"));
          }
        }

        await post.update(data, {
          where: {
            id: id,
          },
          transaction,
        });
        res.status(200).json({
          ok: true,
          message: "Post updated successfully",
        });
      } else {
        next(createError(404, "Post not found or you are not authorized"));
      }
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const {
        keyword,
        textSearch,
        category,
        user_id,
        page = 1,
        limit = 10,
        offset = 0,
      } = req.query;
      const where = {};

      if (keyword) {
        where.keywords = {
          [Op.contains]: [keyword],
        };
      }
      if (textSearch) {
        where.content = {
          [Op.iLike]: `%${textSearch}%`,
        };
      }
      if (category) {
        where.category = category;
      }
      if (user_id) {
        where.user_id = user_id;
      }

      //   where: {},
      //   attributes: [
      //     "id",
      //     "title",
      //     "content",
      //     "category",
      //     "keywords",
      //     "createdAt",
      //     "updatedAt",
      //     // [
      //     //   sequelize.literal(
      //     //     `(SELECT COUNT(*) FROM reactions WHERE reactions.post_id = post.id)`
      //     //   ),
      //     //   "likes",
      //     // ],
      //     // [
      //     //   sequelize.literal(
      //     //     `(SELECT COUNT(*) FROM comments WHERE comments.post_id = post.id)`
      //     //   ),
      //     //   "comments",
      //     // ],
      //   ],
      //   include: [
      //     {
      //       model: User,
      //       attributes: {
      //         exclude: ["password"],
      //       },
      //     },
      //     {
      //       model: Comment,
      //     },
      //     {
      //       model: Reaction,
      //     },
      //   ],
      //   order: [
      //     [
      //       { model: Reaction, as: "reactions" },
      //       sequelize.fn("COUNT", sequelize.col("reactions.id")),
      //       "DESC",
      //     ],
      //   ],
      //   group: ["post.id"],

      //   transaction,
      // });
      const posts = await Post.findAndCountAll({
        where: where,
        attributes: [
          "id",
          "title",
          "content",
          "category",
          "keywords",
          "createdAt",
          "updatedAt",
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM reactions WHERE reactions.post_id = post.id)`
            ),
            "likes",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM comments WHERE comments.post_id = post.id)`
            ),
            "comments",
          ],
        ],
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
        order: [
          [sequelize.literal("likes"), "DESC"],
          [sequelize.literal("comments"), "DESC"],
          ["createdAt", "DESC"],
        ],
        limit: limit,
        offset: offset,
        page: page,
        transaction,
      });

      res.status(200).json({
        ok: true,
        message: "Posts fetched successfully",
        posts: posts,
      });
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};
