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
  width: 250px;
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
.start-button:focus {
  outline: none;
}

.start-button:active {
  transform: scale(0.9);
}
</style>
