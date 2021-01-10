<template>
  <div class="App">
    <div class="flex-container">
      <div class="flex-child alert">
        <h4><span style="font-size: 1em; color: Salmon;"><i class="fa fa-bell"></i> Thank you for ensuring that you are uploading the correct file before hitting submit! 🙌🏻</span></h4>
      </div>
      <div class="flex-child upload">
        <div style="background-color:#e6fffa; padding:22px; border-radius:11px">
          <button type="button" class="btn btn-info btn-md float-right" @click="reloadPage"><i class="fa fa-refresh"></i></button>
          <h3>Upload Grades File</h3>
            <form id="uploadSingleFileForm">
              <div class="form-group">
                <label class="control-label" for="uploadfile"></label>
                <input type="file" class="form-control" placeholder="Select an upload file" name="file" required/>
              </div>
              <button type="submit" class="btn btn-danger" id="btnUploadSingleFileSubmit" @click="addGrades">Submit</button>
            </form>
          <div id="response" style="display:none"></div><br/>
        </div>
      </div>
    </div>  
    <br/><br/>
    <div class="container-fluid">
      <div class="row">
        <h1>Submitted Grades for Mid-Sem 1 | 2020-2021</h1>
      </div><br/>
    </div>
    <div id="table">
      <b-table id="table" head-variant="dark" sticky-header striped bordered small :items="grades" :fields="fields"></b-table>
    </div><br/><br/>
    <div class="media d-flex flex-wrap">
      <div class="col-md-6">
        <p>Click on a student to view Student's Current Assesment Report</p>
        <h4>Students List</h4>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" v-for="(student, id) in students" :key="id" @click="getGradesbyStudent(student.id); getAverageGrade(student.id)">
            {{ student.id }} : {{ student.student_given_name }} {{ student.student_last_name }}
          </li>
        </ul>
      </div> 
      <div class="media-body container-fluid float-right">
        <b-table id="student-grades" bordered small :items="averageGrade"></b-table>
        <b-table id="student-grades" bordered small :items="studentGrades"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      fields: [
        {
          key: 'subject_id',
          sortable: true
        },
        {
          key: 'subject',
          sortable: true
        },
        {
          key: 'grade',
          sortable: true
        },
        {
          key: 'student_given_name',
          sortable: true
        },
        {
          key: 'student_last_name',
          sortable: true
        }
      ],
      grades: [],
      students: [],
      studentGrades: [],
      averageGrade: [],
    };
  },

  created() {
    this.getGrades(),
    this.getStudents(),
    this.getGradesbyStudent(),
    this.getAverageGrade()
  },

  methods: {
    // Get All Grades
    async getGrades() {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/myschooladmin"
        );
        this.grades = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Add Grades
    async addGrades() {
      try {
        await axios.post("http://localhost:5000/users/myschooladmin", {
          grades: this.grades,
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    // Get Students 
    async getStudents() {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/myschooladmin/students"
        );
        this.students = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Get Grades by Student Id
    async getGradesbyStudent(student_id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/myschooladmin/grades/` + student_id
        );
        this.studentGrades = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Get Average Grade by Student Id
    async getAverageGrade(student_id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/myschooladmin/averagegrade/` + student_id
        );
        this.averageGrade = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    reloadPage() {
    window.location.reload()
    console.log("clicked!")
    }
  }
};
</script>

<style>
.list-group {
  height: 200px;
  overflow-y: scroll;
}
#student-grades {
  margin-left: 22px;
}
.list-group-item {
  cursor: pointer;
}
.flex-container {
  display: flex;
}
.flex-child {
  flex: 1;
}  
.flex-child:first-child {
  margin-right: 20px;
} 
.alert {
  padding: 55px;
}
h4 {
  line-height: 1.8;
}
</style>