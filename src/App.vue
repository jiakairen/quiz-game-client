<template>
  <div id="app">
    <div class="nav-bar">
      <div class="title">DAILY QUIZ</div>
      <div>
        <!-- <router-link to="/" class="nav-links">HOME</router-link> -->
        <!-- <router-link to="/login" class="nav-links">LOG IN</router-link> -->
      </div>
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
  padding: 0 0 20px 0;
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
  margin: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
}
.title {
  margin: 0 10px;
  color: white;
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
