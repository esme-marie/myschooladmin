<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <router-link to="/" class="navbar-brand">
        mySchoolAdmin( 😉 )
      </router-link>
      <b-navbar-nav id="isActive">  
        <b-nav-item>
          <router-link to="/" exact-active-class="active" class="nav-link">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/grades" exact-active-class="active" class="nav-link">Grades</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav id="isActive" class="ml-auto">
        <b-nav-item-dropdown text="Awesome" exact-active-class="active" right>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

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
body {
  font-family: 'Nunito', sans-serif;
}
</style>
