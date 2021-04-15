const db = require("../models");
const CovidQuestionaire = db.covidQuestionaire;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const covidQuestionaire = {
    travelHistory: req.body.travelHistory,
    visitedCountry: req.body.visitedCountry,
    peopleContacted: req.body.peopleContacted,
    household: req.body.household,
    symptoms: req.body.symptoms,
  };

  CovidQuestionaire.create(covidQuestionaire)
    .then((data) => {
      console.log("data :>> ", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Covid Questionaire.",
      });
    });
};

exports.findAll = (req, res) => {
  const symptoms = req.query.symptoms;
  let condition = symptoms
    ? { symptoms: { [Op.like]: `%${symptoms}` } }
    : null;

  CovidQuestionaire.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Covid Questionaire.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  CovidQuestionaire.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Covid Questionaire with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  CovidQuestionaire.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Covid Questionaire was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Covid Questionaire with id=${id}. Maybe Covid Questionaire was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Covid Questionaire with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  CovidQuestionaire.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Covid Questionaire was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Covid Questionaire with id=${id}. Maybe Covid Questionaire was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Covid Questionaire with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  CovidQuestionaire.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Covid Questionaire were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Covid Questionaire.",
      });
    });
};
