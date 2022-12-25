const createError = require("http-errors");
const db = require("../models/index.js");
const Post = db.Post;
const sequelize = db.sequelize;

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
