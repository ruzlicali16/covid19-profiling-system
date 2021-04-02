module.exports = (app) => {
  const healthDetails = require("../controllers/health-details.controller.js");
  var router = require("express").Router();

  router.post("/", healthDetails.create);

  // Retrieve all patient
  router.get("/", healthDetails.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", healthDetails.findOne);

  // Update a Tutorial with id
  router.put("/:id", healthDetails.update);

  // Delete a Tutorial with id
  router.delete("/:id", healthDetails.delete);

  // Delete all patient
  router.delete("/", healthDetails.deleteAll);

  app.use("/api/health-details", router);
};
