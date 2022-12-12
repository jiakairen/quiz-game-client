<template>
  <div class="quiz-question">
    <h2>Q{{ currentQuestion + 1 }}: {{ question }}</h2>
  </div>
</template>

<script>
export default {
  name: "QuizQuestion",
  data() {
    return {};
  },
  props: ["question", "currentQuestion"],
};
</script>

<style scoped>
.quiz-question {
  border: 1px solid black;
  border-radius: 1em;
  padding: 0 10px;
  max-width: 90%;
  margin: 30px auto;
}
</style>
