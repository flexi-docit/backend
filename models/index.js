const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const dbCredentials = require("../config/database.config.js");

dotenv.config();

const env = process.env.MODE || "development";

const sequelize = new Sequelize(
  dbCredentials[env].database,
  dbCredentials[env].username,
  dbCredentials[env].password,
  {
    host: dbCredentials[env].host,
    port: dbCredentials[env].port,
    dialect: "postgres",
    logging: null,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./User.model.js")(sequelize, Sequelize);
db.Projects = require("./Project.model.js")(sequelize, Sequelize);
db.Modules = require("./Modules.model.js")(sequelize, Sequelize);
db.Tags = require("./Tags.model.js")(sequelize, Sequelize);
db.Module_Tags = require("./Module_Tags.model.js")(sequelize, Sequelize);
db.Developers = require("./Developers.model.js")(sequelize, Sequelize);
db.Documents = require("./Document.model.js")(sequelize, Sequelize);

// --------------Project User Asssoication--------------
db.Users.hasMany(db.Projects, {
  foreignKey: "lead_id",
});

db.Projects.belongsTo(db.Users, {
  foreignKey: "lead_id",
});

// --------------Module User Asssoication--------------
db.Users.hasMany(db.Modules, {
  foreignKey: "lead_id",
});

db.Modules.belongsTo(db.Users, {
  foreignKey: "lead_id",
});

// --------------Module Project Asssoication--------------
db.Projects.hasMany(db.Modules, {
  foreignKey: "project_id",
});

db.Modules.belongsTo(db.Projects, {
  foreignKey: "project_id",
});

// --------------Module Tags Asssoication--------------
db.Modules.hasMany(db.Module_Tags, {
  foreignKey: "module_id",
});

db.Module_Tags.belongsTo(db.Modules, {
  foreignKey: "module_id",
});

// --------------Tags Asssoication--------------
db.Tags.hasMany(db.Module_Tags, {
  foreignKey: "tag_id",
});

db.Module_Tags.belongsTo(db.Tags, {
  foreignKey: "tag_id",
});

// --------------Developer Project Asssoication--------------
db.Projects.hasMany(db.Developers, {
  foreignKey: "project_id",
});

db.Developers.belongsTo(db.Projects, {
  foreignKey: "project_id",
});

// --------------Developer Module Asssoication--------------
db.Modules.hasMany(db.Developers, {
  foreignKey: "module_id",
});

db.Developers.belongsTo(db.Modules, {
  foreignKey: "module_id",
});

// --------------Developer User Asssoication--------------
db.Users.hasMany(db.Developers, {
  foreignKey: "user_id",
});

db.Developers.belongsTo(db.Users, {
  foreignKey: "user_id",
});

// --------------Document Module Asssoication--------------
db.Documents.belongsTo(db.Modules, {
  foreignKey: "module_id",
});

db.Modules.hasMany(db.Documents, {
  foreignKey: "module_id",
});

module.exports = db;
