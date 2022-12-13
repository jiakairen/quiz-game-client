<template>
  <div class="game-window">
    <QuizQuestion
      :question="quizSet[currentQuestion]?.question || 'loading'"
      :currentQuestion="currentQuestion"
    />
    <QuizChoice
      :option="quizSet[currentQuestion]?.scrambledChoices[0] || 'loading'"
      :optionName="'A'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.A"
      :tailText="tailText.A"
    />
    <QuizChoice
      :option="quizSet[currentQuestion]?.scrambledChoices[1] || 'loading'"
      :optionName="'B'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.B"
      :tailText="tailText.B"
    />
    <QuizChoice
      :option="quizSet[currentQuestion]?.scrambledChoices[2] || 'loading'"
      :optionName="'C'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.C"
      :tailText="tailText.C"
    />
    <QuizChoice
      :option="quizSet[currentQuestion]?.scrambledChoices[3] || 'loading'"
      :optionName="'D'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.D"
      :tailText="tailText.D"
    />
    <div class="game-controls">
      <button @click="nextQuestion">Next Question</button>
    </div>
  </div>
</template>

<script>
import QuizQuestion from "../components/QuizQuestion.vue";
import QuizChoice from "../components/QuizChoice.vue";
import { _ } from "vue-underscore";

import { api } from "../helpers/helpers";

export default {
  name: "GameWindow",
  data() {
    return {
      quizSet: [],
      // currentQ: this.currentQuestion || -1,
      thisRoundSelected: "",
      thisRoundPlayed: false,
      thisRoundCorrect: null,
      thisRoundScore: null,
      totalScore: 0,
      optionClass: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      tailText: {
        A: null,
        B: null,
        C: null,
        D: null,
      },
      ls: null,
    };
  },
  methods: {
    choiceMade($event) {
      if (this.thisRoundPlayed) return;
      this.thisRoundSelected = $event;
      this.thisRoundPlayed = true;
    },
    nextQuestion() {
      if (this.currentQuestion === 4) {
        this.$emit("gameState", 5);
        return;
      }
      this.tailText[this.thisRoundSelected] = null;
      this.tailText[this.thisRoundCorrect] = null;
      this.$emit("changeCurrentQ", this.currentQuestion + 1);
      this.$emit("gameState", 3);
      this.thisRoundSelected = "";
      this.thisRoundPlayed = false;
      this.optionClass.A = "";
      this.optionClass.B = "";
      this.optionClass.C = "";
      this.optionClass.D = "";
    },
    calculateClass(optionName, correct, selected) {
      if (optionName === correct && this.thisRoundPlayed) {
        this.optionClass[optionName] = "correct";
        return;
      } else if (
        optionName === selected &&
        correct !== selected &&
        this.thisRoundPlayed
      ) {
        this.optionClass[optionName] = "incorrect";
      } else if (
        optionName !== correct &&
        optionName !== selected &&
        this.thisRoundPlayed
      ) {
        this.optionClass[optionName] = "unselected";
      }
    },
    calculateScore() {
      this.$root.$on("timerStopped", ($event) => {
        if (this.thisRoundSelected === this.thisRoundCorrect) {
          this.thisRoundScore = 100 - (30 - $event) * 3;
        } else {
          this.thisRoundScore = 0;
          this.tailText[this.thisRoundSelected] = "+0 points";
        }
        this.ls.currentGame.time[this.currentQuestion] = 30 - $event;
        localStorage.dailyQuiz = JSON.stringify(this.ls);
        return;
      });
      // if (this.thisRoundSelected === this.thisRoundCorrect) {
      //   console.log("correct, calculating score");
      //   this.$root.$on("timerStopped", ($event) => {
      //     this.thisRoundScore = 100 - (30 - $event) * 3;
      //   });
      //   return;
      // } else {
      //   console.log(this.thisRoundSelected, this.thisRoundCorrect);
      //   console.log("incorrect, setting score to ZERO");
      //   this.thisRoundScore = 0;
      //   this.tailText[this.thisRoundSelected] = "+0 points";
      //   return;
      // }
    },
    updateTailText() {
      this.tailText[this.thisRoundSelected] = `+${this.thisRoundScore} points`;
    },
  },
  components: {
    QuizQuestion,
    QuizChoice,
  },
  watch: {
    thisRoundPlayed: function () {
      this.calculateClass("A", this.thisRoundCorrect, this.thisRoundSelected);
      this.calculateClass("B", this.thisRoundCorrect, this.thisRoundSelected);
      this.calculateClass("C", this.thisRoundCorrect, this.thisRoundSelected);
      this.calculateClass("D", this.thisRoundCorrect, this.thisRoundSelected);
      this.calculateScore();
      this.$emit("changeTimerStatus", true);
      this.ls.currentGame.selections[this.currentQuestion] =
        this.quizSet[this.currentQuestion].scrambledChoices[
          this.thisRoundSelected.charCodeAt(0) - 65
        ] || "TIMEOUT";
      this.ls.currentGame.correct[this.currentQuestion] =
        this.quizSet[this.currentQuestion].correctAnswer;
      localStorage.dailyQuiz = JSON.stringify(this.ls);
    },
    currentQuestion: function () {
      this.$root.$emit("stepping", this.currentQuestion);
      this.thisRoundCorrect = this.quizSet[this.currentQuestion].correctLetter;
      this.$emit("changeTimerStatus", false);
      this.thisRoundScore = null;
      this.ls.currentGame.currentQuestion = this.currentQuestion;
      localStorage.dailyQuiz = JSON.stringify(this.ls);
    },
    quizSet: function () {
      for (let i = 0; i < this.quizSet.length; i++) {
        const qS = this.quizSet[i];
        const scrambledChoices = _.shuffle([
          ...qS.incorrectAnswers,
          qS.correctAnswer,
        ]);
        const correctLetter = String.fromCharCode(
          scrambledChoices.indexOf(qS.correctAnswer) + 65
        );
        qS.scrambledChoices = scrambledChoices;
        qS.correctLetter = correctLetter;
      }
      this.$emit("changeCurrentQ", this.currentQuestion + 1);
    },
    thisRoundScore: function () {
      this.updateTailText();
      this.totalScore += this.thisRoundScore;
    },
    totalScore: function () {
      this.$emit("updateTotalScore", this.totalScore);
      this.ls.currentGame.score = this.totalScore;
      localStorage.dailyQuiz = JSON.stringify(this.ls);
    },
    timeOut: function () {
      if (this.timeOut) {
        this.thisRoundPlayed = true;
        this.tailText[this.thisRoundCorrect] = `TIME OUT: +0 points`;
      }
    },
    // lsObj: function () {
    //   this.ls = this.lsObj;
    // },
  },
  props: ["currentQuestion", "timeOut", "lsObj"],

  async mounted() {
    const response = await api.getQuiz();
    console.log(response);
    this.quizSet = response.quizSet;
    this.ls = this.lsObj;
    this.ls.currentGame.id = response.id;

    if (this.ls.currentGame.score > 0) {
      this.$emit("updateTotalScore", this.ls.currentGame.score);
      this.totalScore = this.ls.currentGame.score;
    }
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
.correct {
  background-color: green;
  color: white;
}
.correct:hover {
  color: white;
}

.incorrect {
  background-color: red;
  color: white;
}
.incorrect:hover {
  color: white;
}

.unselected {
  opacity: 0.4;
}
</style>
