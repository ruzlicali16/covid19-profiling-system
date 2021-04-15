module.exports = (sequelize, Sequelize) => {
  const PatientDetails = sequelize.define("patientDetails", {
    personalID: {
      type: Sequelize.STRING,
    },
    medicalID: {
      type: Sequelize.STRING,
    },
    questionaireID: {
      type: Sequelize.STRING,
    },
    healthID: {
      type: Sequelize.STRING,
    },
  });

  return PatientDetails;
};
