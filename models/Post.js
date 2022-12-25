module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    keywords: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Post;
};
