module.exports = (app) => {
  const patient = require("../controllers/patient.controller.js");
  var router = require("express").Router();

  router.post("/", patient.create);

  // Retrieve all patient
  router.get("/", patient.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", patient.findOne);

  // Update a Tutorial with id
  router.put("/:id", patient.update);

  // Delete a Tutorial with id
  router.delete("/:id", patient.delete);

  // Delete all patient
  router.delete("/", patient.deleteAll);

  app.use("/api/patient", router);
};
