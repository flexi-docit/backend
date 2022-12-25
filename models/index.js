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
    logging: (msg) => console.log(msg),
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

db.User = require("./User.js")(sequelize, Sequelize);
db.Post = require("./Post.js")(sequelize, Sequelize);
db.Comment = require("./Comment.js")(sequelize, Sequelize);
db.Reaction = require("./Reaction.js")(sequelize, Sequelize);

// Post.user_id -> User.id
db.Post.belongsTo(db.User, {
  foreignKey: "user_id",
});

db.User.hasMany(db.Post, {
  foreignKey: "user_id",
});
// ===============================

// Comment.user_id -> User.id
db.Comment.belongsTo(db.User, {
  foreignKey: "user_id",
});

db.User.hasMany(db.Comment, {
  foreignKey: "user_id",
});
// ===============================

// Comment.post_id -> Post.id
db.Comment.belongsTo(db.Post, {
  foreignKey: "post_id",
});

db.Post.hasMany(db.Comment, {
  foreignKey: "post_id",
});
// ===============================

// Reaction.user_id -> User.id
db.Reaction.belongsTo(db.User, {
  foreignKey: "user_id",
});

db.User.hasMany(db.Reaction, {
  foreignKey: "user_id",
});
// ===============================

// Reaction.post_id -> Post.id
db.Reaction.belongsTo(db.Post, {
  foreignKey: "post_id",
});

db.Post.hasMany(db.Reaction, {
  foreignKey: "post_id",
});
// ===============================

module.exports = db;
