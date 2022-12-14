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
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1em;
  padding: 0 10px;
  max-width: 90%;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0 0 5px #565652;
}
h2 {
  margin: 10px 0;
}
</style>
