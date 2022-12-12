<template>
  <div class="quiz-choice" @click="optionSelected">
    <h4>{{ optionName }}: {{ option }}</h4>
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
  props: ["option", "optionName"],
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
  text-decoration: underline;
}
</style>
