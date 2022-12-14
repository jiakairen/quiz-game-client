<template>
  <div class="start-div">
    <h2>Daily Quiz</h2>
    <button
      ref="startButtonRef"
      @click="startGame"
      @keydown.space="startGame"
      class="start-button"
    >
      START
    </button>
    <p>
      {{
        startButtonMessage ||
        "Welcome to your new daily quiz! Press START to start."
      }}
    </p>
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
  props: ["startButtonMessage"],
  mounted() {
    this.$refs.startButtonRef.focus();
  },
};
</script>

<style scoped>
.start-div {
  width: 300px;
  margin: 0 auto;
  padding: 25px;
  text-align: center;
  color: black;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2em;
}
.start-button {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  border-radius: 100%;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  font-weight: bold;
  transition: 0.2s all;
  font-size: 35px;
}
.start-button:hover {
  font-size: 40px;
}
.start-button:focus {
  outline: none;
}

.start-button:active {
  transform: scale(0.9);
}
</style>
