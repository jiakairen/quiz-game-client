<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <ol>
      <li v-for="(instruction, i) in instructions" :key="i">
        {{ instruction }}
      </li>
    </ol>
    <div class="controls">
      <button @click="dismissWindow" class="buttons">Dismiss</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructionPage",
  data() {
    return {
      title: "How to play?",
      instructions: [
        "Press Start or [Enter] to start the game.",
        "Use your mouse or [A/1], [B/2], [C/3], [D/4] to choose an answer.",
        "You have 30 seconds for each question, the faster you answer, the more points you gain.",
        "No points for incorrect answer or no answer.",
      ],
    };
  },
  methods: {
    dismissWindow() {
      this.$emit("showInstructions", false);
      this.$emit("gameState", 2);
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.container {
  max-width: 90%;
  width: 540px;
  border: 1px solid black;
  border-radius: 1em;
  padding: 20px;
}

.container li {
  text-align: left;
}

.controls {
  text-align: center;
}

.buttons {
  width: 100px;
  height: 30px;
  border: 1px solid black;
  background-color: white;
  border-radius: 1em;
}

.buttons:hover {
  color: white;
  background-color: black;
}
</style>
