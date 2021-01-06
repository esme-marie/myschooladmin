<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">mySchoolAdmin</router-link>
      <div id="isActive" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" exact-active-class="active" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/grades" exact-active-class="active" class="nav-link">Grades</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
.nav-link {
  cursor: pointer;
}
</style>

// class="navbar navbar-expand navbar-dark bg-dark"