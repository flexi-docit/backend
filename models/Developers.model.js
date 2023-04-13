module.exports = (sequelize, Sequelize) => {
  const developers = sequelize.define("developers", {
    project_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    module_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return developers;
};
