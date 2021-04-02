const db = require("../models");
const HealthDetails = db.healthDetails;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.obeservation || !req.body.fName || !req.body.lName) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const healthDetails = {
    obeservation: req.body.obeservation,
    fName: req.body.fName,
    lName: req.body.lName,
  };

  HealthDetails.create(healthDetails)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Health Details.",
      });
    });
};

exports.findAll = (req, res) => {
  const fName = req.query.fName;
  let condition = fName
    ? { fName: { [Op.like]: `%${fName}` } }
    : null;

  HealthDetails.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Health Details.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  HealthDetails.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Health Details with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  HealthDetails.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Health Details was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Health Details with id=${id}. Maybe Health Details was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Health Details with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  HealthDetails.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Health Details was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Health Details with id=${id}. Maybe Health Details was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Health Details with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  HealthDetails.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Health Details were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Health Details.",
      });
    });
};
