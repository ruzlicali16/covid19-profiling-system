module.exports = (sequelize, Sequelize) => {
  const CovidQuestionaire = sequelize.define("covidQuestionaire", {
    visitedCountry: {
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
    symptoms: {
      type: Sequelize.STRING,
    },
  });
  return CovidQuestionaire;
};
