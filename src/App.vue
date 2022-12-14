<template>
  <div id="app">
    <div class="nav-bar">
      <router-link to="/" class="nav-links">QUIZ</router-link>
      <router-link to="/login" class="nav-links">LOG IN</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-image: url("./assets/prism.png");
  background-repeat: repeat;
  color: black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav-bar {
  text-align: right;
  margin: 5px 10px 0 0;
}

.nav-links {
  font-weight: bold;
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
.nav-links:hover {
  text-decoration: underline;
}
</style>
