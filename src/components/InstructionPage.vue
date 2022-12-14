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
        "Press Start to start the game.",
        "There are 5 questions per day.",
        "Use your mouse to choose an answer. Press NEXT to go to next question.",
        "You have 30 seconds for each question, the faster you answer, the more points you gain.",
        "No points for incorrect answer or no answer.",
        "If you've already started a question, please DO NOT refresh the page or close the browser as you will not be able to return that question.",
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
  color: black;
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
