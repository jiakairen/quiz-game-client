<template>
  <div class="quiz-choice">
    <h4>{{ option }}: {{ optionText }}</h4>
  </div>
</template>

<script>
export default {
  name: "QuizChoice",
  data() {
    return {
      option: "A",
      optionText: "It is ...",
    };
  },
};
</script>

<style scoped>
.quiz-choice {
  border: 1px solid black;
  border-radius: 1em;
  padding: 0 10px;
  max-width: 90%;
  margin: 5px auto;
}

.quiz-choice:hover {
  color: red;
}
</style>
