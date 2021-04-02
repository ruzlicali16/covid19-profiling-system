const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const MedicalHistory = sequelize.define("medicalHistory", {
    firstHealthIssue: {
      type: Sequelize.STRING,
    },
    secondHealthIssue: {
      type: Sequelize.STRING,
    },
    smokingHealthIssue: {
      type: Sequelize.STRING,
    },
    otherHealthIssue: {
      type: Sequelize.STRING,
    },
    famMedHistory: {
      type: Sequelize.STRING,
    },
  });
  return MedicalHistory;
};
