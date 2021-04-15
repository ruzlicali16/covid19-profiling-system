const db = require("../models");
const MedicalHistory = db.medicalHistory;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const medicalHistory = {
    smokingHealthIssue: req.body.smokingHealthIssue,
    diseases: req.body.diseases,
    famMedHistory: req.body.famMedHistory,
  };

  MedicalHistory.create(medicalHistory)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Medical History.",
      });
    });
};

exports.findAll = (req, res) => {
  const smokingHealthIssue = req.query.smokingHealthIssue;
  let condition = smokingHealthIssue
    ? { smokingHealthIssue: { [Op.like]: `%${smokingHealthIssue}` } }
    : null;

  MedicalHistory.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Medical History.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  MedicalHistory.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Medical History with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  MedicalHistory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Medical History was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Medical History with id=${id}. Maybe Medical History was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Medical History with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  MedicalHistory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Medical History was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Medical History with id=${id}. Maybe Medical History was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Medical History with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  MedicalHistory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Medical History were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Medical History.",
      });
    });
};
