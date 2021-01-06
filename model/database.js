require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "myschooladmin",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = " drop database IF exists `myschooladmin`; create database myschooladmin; use myschooladmin; " 
  + "CREATE TABLE `students` (`id` varchar(6) NOT NULL,`student_given_name` VARCHAR(255) NOT NULL,`student_last_name` VARCHAR(255) NOT NULL,`class_grade` varchar(2) NOT NULL,PRIMARY KEY (`id`));" 
  + "CREATE TABLE `teachers` (`id` INT NOT NULL AUTO_INCREMENT,`given_name` VARCHAR(255) NOT NULL,`last_name` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`));"
  + "CREATE TABLE `subjects` (`id` varchar(5) NOT NULL,`subject` VARCHAR(255) NOT NULL UNIQUE,`teacher_id` INT NOT NULL,PRIMARY KEY (`id`));"
  + "CREATE TABLE `grades` (`id` INT NOT NULL AUTO_INCREMENT,`subject_id` varchar(5) NOT NULL,`student_id` varchar(6) NOT NULL,`grade` DECIMAL(5,2) NOT NULL,`semester_assessment` varchar(255) NOT NULL,PRIMARY KEY (`id`));"
  + "ALTER TABLE `subjects` ADD CONSTRAINT `subjects_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`); ALTER TABLE `grades` ADD CONSTRAINT `grades_fk0` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`); ALTER TABLE `grades` ADD CONSTRAINT `grades_fk1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`);";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tables creation for `myschooladmin` db were successful!");

    console.log("Closing...");
  });

  con.end();
});
