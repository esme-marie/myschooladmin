<template>
  <div class="App">
    <div class="container">
      <div class="row">
        <div style="background-color:#e6fffa; padding:10px; border-radius:3px">
          <h3>Upload File</h3>
          <form id="uploadSingleFileForm">
            <div class="form-group">
              <label class="control-label" for="uploadfile">Please select a file:</label>
              <input type="file" class="form-control" placeholder="Select an upload file" name="file" required/>
            </div>
            <button type="submit" class="btn btn-danger" id="btnUploadSingleFileSubmit">Submit</button>
          </form>
          <div id="response" style="display:none"></div>
        </div>
      </div>
    </div>
    <br/><br/>
    <h1>Submitted Grades</h1>
    <!-- <router-link :to="{ name: 'Grades' }"/> -->
    <div class="row">
      <!-- <b-table striped hover :items="grades"></b-table> -->
      <ul>
        <li
          v-for="grade in grades" :key="grade.subject_id">
          {{ grade.subject_id }}
          {{ grade.name }}
          {{ grade.grade }}
          {{ grade.given_name }}
          {{ grade.last_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "Grades",
  data() {
    return {
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
  },
};
</script>

<style>
</style>