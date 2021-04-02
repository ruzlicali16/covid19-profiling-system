const db = require("../models");
const PersonalDetails = db.personalDetails;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.citizenType ||
    !req.body.fName ||
    !req.body.lName ||
    !req.body.gender ||
    !req.body.contactNum ||
    !req.body.age ||
    !req.body.emailAddress ||
    !req.body.province ||
    !req.body.municipal ||
    !req.body.brgy ||
    !req.body.currentAddress ||
    !req.body.homeAddress
  ) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const personalDetails = {
    citizenType: req.body.citizenType,
    fName: req.body.fName,
    lName: req.body.lName,
    gender: req.body.gender,
    contactNum: req.body.contactNum,
    age: req.body.age,
    emailAddress: req.body.emailAddress,
    province: req.body.province,
    municipal: req.body.municipal,
    brgy: req.body.brgy,
    currentAddress: req.body.currentAddress,
    homeAddress: req.body.homeAddress,
  };

  PersonalDetails.create(personalDetails)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Personal Details.",
      });
    });
};

exports.findAll = (req, res) => {
  const fName = req.query.fName;
  let condition = fName ? { fName: { [Op.like]: `%${fName}` } } : null;

  PersonalDetails.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Personal Details.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PersonalDetails.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Personal Details with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PersonalDetails.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Personal Details was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Personal Details with id=${id}. Maybe Personal Details was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Personal Details with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PersonalDetails.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Personal Details was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Personal Details with id=${id}. Maybe Personal Details was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Personal Details with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  PersonalDetails.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Personal Details were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Personal Details.",
      });
    });
};
