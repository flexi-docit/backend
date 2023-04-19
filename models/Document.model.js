module.exports = (sequelize, Sequelize) => {
  const document = sequelize.define("document", {
    markdown: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
    module_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });

  return document;
};
