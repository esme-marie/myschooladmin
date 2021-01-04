<template>
  <div class="App">
    <h1>Submitted Grades</h1>
    <router-link :to="{ name: 'Index' }"/>
    <!-- <div class="row">
      <input 
        type="text"
        class="form-control"
        placeholder="Enter item to do"
        v-model="toDoItem"
        width="250px"
      />
      <button class="add-button" v-on:click="addItem()">ADD</button>
    </div> -->
    <div class="row">
      <ul>
        <li
          v-for="grade in grades" :key="grade.subject_id">
          {{ grade.student_id }}
          {{ grade.grade }}
          <!-- v-for="(todo,i) in sortedList()" 
          :key="todo.i"
          :class="{ isCompleted: todo.status }">
          <input
            type="checkbox"
            class="form-control"
            :label="todo.name"
            v-model="todo.status"
          />
          <span>
            {{todo.name}}
          </span>
          <button class="delete-button" @click="deleteToDo(i)">x</button> -->
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