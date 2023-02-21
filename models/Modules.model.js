module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define(
    "module",
    {
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
        type: Sequelize.ENUM("pending", "completed", "archived"),
        defaultValue: "pending",
        allowNull: false,
      },
      lead_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      hooks: {
        beforeUpdate: async (instance) => {
          if (instance.status === "archived") {
            await instance.destroy();
          }
          return instance;
        },
      },
    }
  );

  return model;
};
