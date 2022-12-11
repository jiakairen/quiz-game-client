<template>
  <div class="game-window">
    <QuizQuestion />
    <QuizChoice />
    <QuizChoice />
    <QuizChoice />
    <QuizChoice />
    <div class="game-controls">
      <button>Next Question</button>
    </div>
  </div>
</template>

<script>
import QuizQuestion from "../components/QuizQuestion.vue";
import QuizChoice from "../components/QuizChoice.vue";

export default {
  name: "GameWindow",
  data() {
    return {};
  },
  components: {
    QuizQuestion,
    QuizChoice,
  },
};
</script>

<style scoped>
.game-window {
  border: 1px solid black;
  border-radius: 1em;
  max-width: 90%;
  width: 960px;
  margin: 0 auto;
}
.game-controls {
  text-align: center;
  margin: 30px auto;
}
</style>
