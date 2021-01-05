<template>
  <div class="App">
    <h1>Submitted Grades</h1>
    <router-link :to="{ name: 'Index' }"/>
    <div class="row">
      <ul>
        <li
          v-for="grade in grades" :key="grade.subject_id">
          {{ grade.student_id }}
          {{ grade.grade }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "GradesList",
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
        const response = await axios.get("http://localhost:5000/users/myschooladmin");
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