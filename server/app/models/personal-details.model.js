module.exports = (sequelize, Sequelize) => {
  const PersonalDetails = sequelize.define("personalDetails", {
    citizenType: {
      type: Sequelize.STRING,
    },
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
    emailAddress: {
      type: Sequelize.STRING,
    },
    province: {
      type: Sequelize.STRING,
    },
    municipal: {
      type: Sequelize.STRING,
    },
    brgy: {
      type: Sequelize.STRING,
    },
    currentAddress: {
      type: Sequelize.STRING,
    },
    homeAddress: {
      type: Sequelize.STRING,
    },
  });

  return PersonalDetails;
};
