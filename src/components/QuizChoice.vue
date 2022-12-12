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
      this.$emit("optionSelected", this.optionName);
    },
  },
  props: ["option", "optionName", "tailText"],
};
</script>

<style scoped>
h4 {
  display: inline-block;
}
.quiz-choice {
  border: 1px solid black;
  border-radius: 1em;
  padding: 0 10px;
  max-width: 90%;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
}

.quiz-choice:hover > .choice-text {
  text-decoration: underline;
}

.tail-text {
  text-align: right;
}
</style>
