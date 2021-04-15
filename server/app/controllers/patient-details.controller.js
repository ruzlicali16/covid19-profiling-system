const db = require("../models");
const PatientDetails = db.patientDetails;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.personalID ||
    !req.body.medicalID ||
    !req.body.questionaireID ||
    !req.body.healthID
  ) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const patientDetails = {
    personalID: req.body.personalID,
    medicalID: req.body.medicalID,
    questionaireID: req.body.questionaireID,
    healthID: req.body.healthID,
  };

  PatientDetails.create(patientDetails)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Patient Details.",
      });
    });
};

exports.findAll = (req, res) => {
  const fName = req.query.fName;
  let condition = fName ? { fName: { [Op.like]: `%${fName}` } } : null;

  PatientDetails.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Patient Details.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PatientDetails.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Patient Details with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PatientDetails.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Patient Details was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Patient Details with id=${id}. Maybe Patient Details was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Patient Details with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PatientDetails.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Patient Details was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Patient Details with id=${id}. Maybe Patient Details was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Patient Details with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  PatientDetails.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Patient Details were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Patient Details.",
      });
    });
};
