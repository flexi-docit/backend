module.exports = (sequelize, Sequelize) => {
  const tags = sequelize.define("tags", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return tags;
};
