let express = require('express');
let router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
router.use(bodyParser.json());

const fs = require('fs');
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');

global.__basedir = __dirname;


/* 
steps are 
- initialize readXlslx
- initialize multer
- initialize upload variable 
- write the api post request 
- follow the steps below

you need to handle the uploading of grades via file upload.
- post /uploadGrades
- in the browser example ... your upload object should be ready with the multer initialized. 
- inside the post you have to also take the ExcelData2MySql
- readXlsxFile should already be initialized. 
- then you are writing each row as an INSERT INTO each record in the grades table. 
- will look similar to this db("INSERT INTO grades (subject_id, student_id, grade, semester_assessment) VALUES [rows];")
    .then(results => {
      res.send(results.data);
    })
    BUT WITH ROWS data
- To be more clear ... you can console.log the rows and see how you can better create your query. 

*/
// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});

const upload = multer({ storage: storage });

let path = __basedir + '/client/public/';

router.get('/', (req,res) => {
  console.log("__basedir" + __basedir);
  res.sendFile(path + "index.html");
});

router.post('/myschooladmin', function (req, res) {
  //read the file that is already there and save values into db. 

  console.log("about to post grades");

  //checks if the file exists
  try {
    // let filePath = __basedir + "/uploads/" + req.file.filename;
    if (fs.existsSync('grades.xlsx')) {

      console.log("The file exists.");

      //only then go through it ..

      readXlsxFile('./grades.xlsx').then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.   
        console.log(rows);
        // console.table(rows);      
        // Remove Header ROW

        rows.shift();

        // //truncate existing table before posting
        // db("TRUNCATE TABLE grades;")
        // .then(results => {
        //   res.send(results.data);
        // })
        // .catch(err => res.status(500).send(err));

        ///put in the query to submit in the db. INSERT INTO 

        rows.forEach((col) => {
          let queryStr = "";
          col.forEach((data) => {
            if((typeof data) === "float") {
              queryStr += JSON.stringify(data)+",";
            } else {
              queryStr +=  "'"+data + "',";
            }
           //console.log(typeof data);
          });
          queryStr = queryStr.substring(0, queryStr.length-1)
          console.log(queryStr);
            db(`TRUNCATE TABLE grades; INSERT INTO grades (subject_id, student_id, grade, semester_assessment) VALUES (${queryStr});`)
              .then(() => {
                const result = {
                  status: "ok",
                  filename: req.file.originalname,
                  message: "Uploaded Successfully!",
                }
                res.json(result);
              })
              .catch((error) => {
                const result = {
                  status: "fail",
                  filename: req.file.originalname,
                  message: "Upload Error! message = " + error.message
                }
                res.json(result);
              });
        });


      });

    } else {
      console.log('The file does not exist.');
    }
  } catch (err) {
    console.error(err);
  }

});

// 

// // -> Express Upload RestAPIs
// router.post('/myschooladmin', function(req, res, next) {
//   console.log("what is the error?");
//   importExcelData2MySQL(__basedir + '/uploads/grades.xlsx');
//   res.json({
//     'msg': 'File uploaded/import successfully!', 'file': req.file
//   });
// });

// // -> Import Excel Data to MySQL database
// function importExcelData2MySQL(filePath){
//   // File path.
//   console.log("And here?")
//   readXlsxFile(filePath).then((rows) => {
//     // `rows` is an array of rows
//     // each row being an array of cells.   
//     console.log(rows);

//     /**
//     [ [ subject_id, student_id, grade, semester_assessment ],
//     [ MYL02,	FTM001,	88.00,	Mid-Sem_1/2020-2021 ],
//     [ MYL02,	FTJ001,	66.00,	Mid-Sem_1/2020-2021 ],
//     [ MYL02,	FTU001,	94.00	Mid-Sem_1/2020-2021 ] ] 
//     */

//     // Remove Header ROW
//     rows.shift();
//   });
// }

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send("Welcome to mySchoolAdmin database :)");
});

router.get("/myschooladmin", (req, res) => {
  // Send back the full list of grades
  db("SELECT subject_id, name, grade, given_name, last_name FROM grades INNER JOIN subjects ON grades.subject_id = subjects.id INNER JOIN students ON grades.student_id = students.id ORDER BY subject_id;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
