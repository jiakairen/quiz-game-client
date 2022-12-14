<template>
  <div id="app">
    <div class="nav-bar">
      <router-link to="/" class="nav-links">Home</router-link>
      <router-link to="/login" class="nav-links">Log In</router-link>
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
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav-bar {
  text-align: right;
}

.nav-links {
  font-weight: bold;
  color: white;
  margin: 0 10px;
}
</style>
