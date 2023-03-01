module.exports = (sequelize, Sequelize) => {
  const module_tags = sequelize.define("module_tags", {
    module_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return module_tags;
};
