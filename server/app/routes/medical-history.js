module.exports = (app) => {
    const medicalHistory = require("../controllers/medical-history.controller.js");
    var router = require("express").Router();
  
    router.post("/", medicalHistory.create);
  
    // Retrieve all patient
    router.get("/", medicalHistory.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", medicalHistory.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", medicalHistory.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", medicalHistory.delete);
  
    // Delete all patient
    router.delete("/", medicalHistory.deleteAll);
  
    app.use("/api/medical-history", router);
  };
  