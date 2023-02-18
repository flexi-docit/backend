module.exports = (sequelize, Sequelize) => {
  const module_tags = sequelize.define("module_tags", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    module_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return module_tags;
};
