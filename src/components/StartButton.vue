<template>
  <div class="start-div">
    <button @click="startGame" class="start-button">START</button>
    <p>Or hit [space]</p>
  </div>
</template>

<script>
export default {
  name: "StartButton",
  methods: {
    startGame() {
      this.$emit("gameState", 3);
    },
  },
};
</script>

<style scoped>
.start-div {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
}
.start-button {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  border-radius: 100%;
  background: red;
  color: white;
  font-weight: bold;
  transition: 0.2s all;
}
.start-button:hover {
  font-size: 120%;
}

.start-button:active {
  transform: scale(0.9);
}
</style>
