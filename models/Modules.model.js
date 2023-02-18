module.exports = (sequelize, Sequelize) => {
  const modules = sequelize.define("modules", {
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
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lead_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return modules;
};
