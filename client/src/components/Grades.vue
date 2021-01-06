<template>
  <div class="App">
    <div class="container">
      <div class="row">
        <div style="background-color:#e6fffa; padding:10px; border-radius:3px">
          <h3>Upload Grades File</h3>
          <form id="uploadSingleFileForm">
            <div class="form-group">
              <label class="control-label" for="uploadfile"></label>
              <input type="file" class="form-control" placeholder="Select an upload file" name="file" required/>
            </div>
            <button type="submit" class="btn btn-danger" id="btnUploadSingleFileSubmit" @click="addGrades">Submit</button>
          </form>
          <div id="response" style="display:none"></div>
        </div>
      </div>
    </div>
    <br/><br/>
    <div class="container-fluid">
      <div class="row">
        <h1>Submitted Grades for Mid-Sem 1 / 2020-2021</h1>
        <button type="button" class="btn btn-info btn-sm ml-auto" @click="reloadPage">Refresh
          <i class="fa fa-refresh"></i>
        </button>
      </div><br/>
    </div>
    <!-- <button style="font-size:24px">Button <i class="fa fa-refresh"></i></button> -->
    <div id="table">
      <b-table id="table" head-constiant="dark" sticky-header striped bordered small :items="grades" :fields="fields"></b-table>
    </div>
    <canvas id="chart" width="400" height="400"></canvas>
  </div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "Grades",
  data() {
    return {
      // keyword: '',
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
    };
  },

  created() {
    this.getGrades();
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
    reloadPage() {
    window.location.reload()
    console.log("clicked!")
    }
  }
};
</script>

<style>
</style>