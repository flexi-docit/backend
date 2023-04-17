module.exports = (sequelize, Sequelize) => {
  const document = sequelize.define("document", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    module_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return document;
};
