<template>
  <div class="quiz-choice" @click="optionSelected">
    <h4 class="choice-text">{{ optionName }}: {{ option }}</h4>
    <h4 class="tail-text">{{ tailText }}</h4>
  </div>
</template>

<script>
export default {
  name: "QuizChoice",
  data() {
    return {};
  },
  methods: {
    optionSelected() {
      if (this.currentQuestion === -1) return;
      this.$emit("optionSelected", this.optionName);
    },
  },
  props: ["option", "optionName", "tailText", "currentQuestion"],
};
</script>

<style scoped>
h4 {
  display: inline-block;
}
.quiz-choice {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1em;
  padding: 0 10px;
  max-width: 90%;
  margin: 8px auto;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 2.5px #565652;
}

.quiz-choice:not(.correct, .incorrect):hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.tail-text {
  text-align: right;
}
</style>
