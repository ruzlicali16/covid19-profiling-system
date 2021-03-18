const db = require("../models");
const Patient = db.patient;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.fName ||
    !req.body.lName ||
    !req.body.gender ||
    !req.body.contactNum ||
    !req.body.age
  ) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const patient = {
    fName: req.body.fName,
    lName: req.body.lName,
    gender: req.body.gender,
    contactNum: req.body.contactNum,
    age: req.body.age,
  };

  Patient.create(patient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient.",
      });
    });
};

exports.findAll = (req, res) => {
  const fName = req.query.fName;
  let condition = fName ? { fName: { [Op.like]: `%${fName}` } } : null;

  Patient.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Patients.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Patient.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Patient with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Patient.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Patient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Patient with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Patient.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Patient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
    Patient.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Patients were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Patients.",
        });
      });
  };
