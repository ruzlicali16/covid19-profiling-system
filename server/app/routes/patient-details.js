module.exports = (app) => {
    const patientDetails = require("../controllers/patient-details.controller.js");
    var router = require("express").Router();
  
    router.post("/", patientDetails.create);
  
    // Retrieve all patient
    router.get("/", patientDetails.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", patientDetails.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", patientDetails.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", patientDetails.delete);
  
    // Delete all patient
    router.delete("/", patientDetails.deleteAll);
  
    app.use("/api/patient-details", router);
  };
  