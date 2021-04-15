const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOption));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my server!" });
});

require("./app/routes/personal-details")(app);
require("./app/routes/medical-history")(app);
require("./app/routes/covid-questionaire")(app);
require("./app/routes/health-details")(app);
require("./app/routes/patient-details")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
