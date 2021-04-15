module.exports = (sequelize, Sequelize) => {
  const MedicalHistory = sequelize.define("medicalHistory", {
    diseases: {
      type: Sequelize.STRING,
    },
    smokingHealthIssue: {
      type: Sequelize.STRING,
    },
    famMedHistory: {
      type: Sequelize.STRING,
    },
  });
  return MedicalHistory;
};
