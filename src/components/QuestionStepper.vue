<template>
  <div class="question-stepper">
    <p>Q {{ currentQuestion + 1 }} / {{ totalQuestion }}</p>
  </div>
</template>

<script>
export default {
  name: "QuestionStepper",
  data() {
    return {
      totalQuestion: 10,
    };
  },
  props: ["currentQuestion"],
};
</script>

<style scoped>
.question-stepper {
  height: 50px;
  width: 100px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
}
</style>
