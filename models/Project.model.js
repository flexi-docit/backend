module.exports = (sequelize, Sequelize) => {
  const project = sequelize.define("project", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lead_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return project;
};
