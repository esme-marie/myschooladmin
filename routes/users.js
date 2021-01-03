var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("Welcome to mySchoolAdmin database :)");
});

router.get("/myschooladmin", (req, res) => {
  // Send back the full list of grades
  db("SELECT * FROM grades ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
