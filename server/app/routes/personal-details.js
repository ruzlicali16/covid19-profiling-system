module.exports = (app) => {
  const personalDetails = require("../controllers/personal-details.controller.js");
  var router = require("express").Router();

  router.post("/", personalDetails.create);

  // Retrieve all patient
  router.get("/", personalDetails.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", personalDetails.findOne);

  // Update a Tutorial with id
  router.put("/:id", personalDetails.update);

  // Delete a Tutorial with id
  router.delete("/:id", personalDetails.delete);

  // Delete all patient
  router.delete("/", personalDetails.deleteAll);

  app.use("/api/personal-details", router);
};
