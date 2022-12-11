<template>
  <div id="app">
    <div class="nav-bar">
      <router-link to="/" class="nav-links">Home</router-link>
      <router-link to="/" class="nav-links">Log In</router-link>
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav-bar {
  text-align: right;
}

.nav-links {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
</style>
