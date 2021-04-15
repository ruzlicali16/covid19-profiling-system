const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    aquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.personalDetails = require("./personal-details.model.js")(sequelize, Sequelize);
db.medicalHistory = require("./medical-history.model.js")(sequelize, Sequelize);
db.covidQuestionaire = require("./covid-questionaire.model.js")(sequelize, Sequelize);
db.healthDetails = require("./health-details.model.js")(sequelize, Sequelize);
db.patientDetails = require("./patient-details.model.js")(sequelize, Sequelize);

module.exports = db;
