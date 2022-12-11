<template>
  <div class="question-stepper">
    <p>Q {{ currentQuestion }}/{{ totalQuestion }}</p>
  </div>
</template>

<script>
export default {
  name: "QuestionStepper",
  data() {
    return {
      currentQuestion: 1,
      totalQuestion: 5,
    };
  },
};
</script>

<style scoped>
.question-stepper {
  border: 1px solid black;
  height: 50px;
  width: 100px;
  text-align: center;
}
</style>
