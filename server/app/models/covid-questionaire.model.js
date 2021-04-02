const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const CovidQuestionaire = sequelize.define("covidQuestionaire", {
    firstSymptoms: {
      type: Sequelize.STRING,
    },
    secondSymptoms: {
      type: Sequelize.STRING,
    },
    travelHistory: {
      type: Sequelize.STRING,
    },
    peopleContacted: {
      type: Sequelize.STRING,
    },
    household: {
      type: Sequelize.STRING,
    },
  });
  return CovidQuestionaire;
};
