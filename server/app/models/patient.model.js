module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patient", {
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    contactNum: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
  });

  return Patient;
};
