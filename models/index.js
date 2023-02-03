const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const dbCredentials = require("../config/database.config.js");

const logger = require("../utils/logger.js");

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
    logging: (msg) => logger.info(msg),
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

module.exports = db;
