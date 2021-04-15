module.exports = (sequelize, Sequelize) => {
  const HealthDetails = sequelize.define("healthDetails", {
    obeservation: {
      type: Sequelize.STRING,
    },
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
  });
  return HealthDetails;
};
