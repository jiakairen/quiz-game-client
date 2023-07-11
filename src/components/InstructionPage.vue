<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <ol>
      <li v-for="(instruction, i) in instructions" :key="i">
        {{ instruction }}
      </li>
    </ol>
    <div class="controls">
      <button @click="dismissWindow" class="buttons">DISMISS</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructionPage",
  data() {
    return {
      title: "Daily Quiz Rules",
      instructions: [
        "There are 10 questions per day. Questions refresh at midnight (GMT+0) or 10/11am (AEST/AEDT) everyday.",
        "Use your mouse or tap to choose an answer. Press NEXT to start the next question.",
        "You have 30 seconds for each question. Maximum points for correctly answer the question in the first 4 seconds.",
        "No points given for incorrect answers or time out.",
        "If you've already started a question, DO NOT refresh the page or close the browser as you will not be able to return to that question.",
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
