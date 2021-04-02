module.exports = (app) => {
  const covidQuestionaire = require("../controllers/covid-questionaire.controller.js");
  var router = require("express").Router();

  router.post("/", covidQuestionaire.create);

  // Retrieve all patient
  router.get("/", covidQuestionaire.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", covidQuestionaire.findOne);

  // Update a Tutorial with id
  router.put("/:id", covidQuestionaire.update);

  // Delete a Tutorial with id
  router.delete("/:id", covidQuestionaire.delete);

  // Delete all patient
  router.delete("/", covidQuestionaire.deleteAll);

  app.use("/api/covid-questionaire", router);
};
