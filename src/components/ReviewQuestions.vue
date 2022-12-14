<template>
  <div class="container">
    <h2>Review Coming Soon...</h2>
    <button class="buttons" @click="closeWindow">RETURN</button>
  </div>
</template>

<script>
export default {
  name: "ReviewQuestions",
  methods: {
    closeWindow() {
      this.$emit("showReview", false);
    },
  },
};
</script>

<style scoped>
.container {
  height: 110px;
  width: 400px;
  text-align: center;
  color: black;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2em;
  box-shadow: 0 0 10px #565652;
  padding: 10px;
}
h2 {
  margin: 10px;
}
.buttons {
  width: 100px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0);
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  border-radius: 1em;
  transition: 0.2s all;
}

.buttons:hover {
  color: white;
  background-color: #565652;
  border: 1px solid #565652;
}

.buttons:active {
  transform: scale(0.9);
}
</style>
