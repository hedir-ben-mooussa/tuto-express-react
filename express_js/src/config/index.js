const config = require("./db.config.js");
const Sequelize = require("sequelize");
const configserverdb = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.port,
  dialect: config.dialect,
  operatorsAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.configserverdb = configserverdb;
db.user = require("../models/user.entity.js")(configserverdb, Sequelize);
// db.member = require("../models/user.entity.js")(configserverdb, Sequelize);

module.exports = db;
