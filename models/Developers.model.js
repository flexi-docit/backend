module.exports = (sequelize, Sequelize) => {
  const developers = sequelize.define("developers", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    module_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return developers;
};
