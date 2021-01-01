# myschooladmin

![Frontend_Design] (support/msa_frontend-design.png)

A Minimum Viable Product (MVP) for users to upload school grades, then view and get grades report onclick.

## Motivation

FOR school administrators and teachers, WHO are in need to ease administrative and grades report workload. THE MVP IS a Single Page Application THAT generates grades report promptly, UNLIKE time consuming email and spreadsheet report collaboration between teachers and administrators. THIS PRODUCT rids the user's hassle of compiling all grades from many files to create a report.

## Features

- Upload school grades excel file by subject
- Retrieve grades report onclick with data visualization

## Tech / Framework

Built with Vue.Js, Node.Js/ Express.Js and MySQL.

## Database Schema

![Database_Schema] (support/msa_database-schema.png)

## API Routes Plan

URI | HTTP Method | Description | Request Object | Response Object
--- | ----------- | ----------- | -------------- | ---------------
/api/grades/:subject_id | POST | Create grades by subject_id | body/ params | }
id: integer,
subject_id: varchar,
teacher_id: integer,
student_id: varchar,
grade: varchar,
semester_assessment: date
}
/api/grades/:subject_id | GET | Retrieve grades by subject_id | params
/api/grades/:semester_assessment | GET | Retrieve grades by semester_assessment | params
/api/grades/:student_id | GET | Retrieve grades by student_id | params
/api/grades | GET | Retrieve all grades | params

## User Flow Diagram

![User_Flow] (support/msa_user-flow.png)

## Architecture Drawing

![Architecture] (support/msa_architecture.png)

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`
- `cd client` and run `npm install`. This will install client dependencies

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called myschooladmin: `create database myschooladmin;`
- Create a `.env` file in project directory and add

```bash
  DB_NAME=myschooladmin
  DB_PASS=YOURPASSWORD
```

- Replace `YOUR_PASSWORD` with your actual password

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create 4 tables (grades, students, subjects and teachers) in your database.

### Run Your Development Servers

- Run `yarn start` in project directory to start the Express server on port 5000
- `cd client` and run `npm install` to install packages and `npm run serve` to run your development build. The app will run on `http://localhost:8080` as the default port.

## Resources

- [MySQL Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Vue Documentation](https://vuejs.org/v2/guide/)

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona and [Rebound.Asia](https://www.rebound.asia/breakthrough), by TechSprint Academy (Malaysia’s first women only coding academy)._
