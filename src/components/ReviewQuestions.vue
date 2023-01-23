<template>
  <div class="container">
    <h2>Question Review</h2>
    <p v-for="(quiz, index) in reviewQuestions" :key="index" class="quiz">
      <span class="question"
        >Q{{ Number(index) + 1 }}: {{ quiz.question }}</span
      >
      <span>Correct answer: {{ quiz.correct }}</span>
      <span v-if="quiz.correct === quiz.selection" class="correct"
        >You answered correctly</span
      >
      <span v-if="quiz.correct !== quiz.selection" class="incorrect">{{
        quiz.selection === "TIMEOUT"
          ? "You timed out"
          : `You selected: ${quiz.selection}`
      }}</span>
    </p>
    <button class="buttons" @click="closeWindow">RETURN</button>
  </div>
</template>

<script>
export default {
  name: "ReviewQuestions",
  data() {
    return {
      lsObj: null,
      reviewQuestions: {
        0: {
          question: "",
          correct: "",
          selection: "",
        },
        1: {
          question: "",
          correct: "",
          selection: "",
        },
        2: {
          question: "",
          correct: "",
          selection: "",
        },
        3: {
          question: "",
          correct: "",
          selection: "",
        },
        4: {
          question: "",
          correct: "",
          selection: "",
        },
      },
    };
  },
  methods: {
    closeWindow() {
      this.$emit("showReview", false);
    },
  },
  async mounted() {
    this.lsObj = await JSON.parse(localStorage.dailyQuiz);
    for (let i = 0; i < 5; i++) {
      this.reviewQuestions[i].question = this.lsObj.quizSet[i];
      this.reviewQuestions[i].correct = this.lsObj.currentGame.correct[i];
      this.reviewQuestions[i].selection = this.lsObj.currentGame.selections[i];
    }
  },
};
</script>

<style scoped>
.container {
  /* height: 110px; */
  width: 880px;
  max-width: 85%;
  text-align: center;
  color: black;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2em;
  box-shadow: 0 0 10px #565652;
  padding: 10px 20px;
}
h2 {
  margin: 10px;
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

.quiz {
  text-align: left;
}

.question {
  font-weight: bold;
}

.quiz * {
  display: block;
}

.correct {
  color: green;
}

.incorrect {
  color: rgba(255, 0, 0, 0.8);
}
</style>
