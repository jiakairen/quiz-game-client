<template>
  <div class="game-window">
    <QuizQuestion
      :question="
        quizSet[currentQuestion]?.question || 'Hold on, server waking up...'
      "
      :currentQuestion="currentQuestion"
    />
    <QuizChoice
      :option="
        quizSet[currentQuestion]?.scrambledChoices[0] ||
        'Hold on, server waking up...'
      "
      :optionName="'A'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.A"
      :tailText="tailText.A"
      :currentQuestion="currentQuestion"
    />
    <QuizChoice
      :option="
        quizSet[currentQuestion]?.scrambledChoices[1] ||
        'Hold on, server waking up...'
      "
      :optionName="'B'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.B"
      :tailText="tailText.B"
      :currentQuestion="currentQuestion"
    />
    <QuizChoice
      :option="
        quizSet[currentQuestion]?.scrambledChoices[2] ||
        'Hold on, server waking up...'
      "
      :optionName="'C'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.C"
      :tailText="tailText.C"
      :currentQuestion="currentQuestion"
    />
    <QuizChoice
      :option="
        quizSet[currentQuestion]?.scrambledChoices[3] ||
        'Hold on, server waking up...'
      "
      :optionName="'D'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.D"
      :tailText="tailText.D"
      :currentQuestion="currentQuestion"
    />
    <div class="game-controls">
      <button @click="nextQuestion" :class="buttonClass" class="next-button">
        {{ altButtonName || "NEXT" }}
      </button>
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
      buttonClass: "",
      altButtonName: "",
    };
  },
  methods: {
    choiceMade($event) {
      if (this.thisRoundPlayed) return;
      this.thisRoundSelected = $event;
      this.thisRoundPlayed = true;
    },
    nextQuestion() {
      if (this.currentQuestion === -1) return;
      if (this.currentQuestion === 4) {
        this.$emit("gameState", 5);
        return;
      }
      if (!this.thisRoundPlayed) {
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
    calculateButtonClass() {
      if (this.thisRoundPlayed) {
        this.buttonClass = "button-enabled";
      } else {
        this.buttonClass = "button-disabled";
      }
    },
    calculateScore() {
      this.$root.$on("timerStopped", ($event) => {
        if (this.thisRoundSelected === this.thisRoundCorrect) {
          let tempScore = 109 - (30 - $event) * 3;
          if (tempScore > 100) tempScore = 100;
          this.thisRoundScore = tempScore;
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
      this.calculateButtonClass();
    },
    currentQuestion: function () {
      this.$root.$emit("stepping", this.currentQuestion);
      this.thisRoundCorrect = this.quizSet[this.currentQuestion].correctLetter;
      this.$emit("changeTimerStatus", false);
      this.thisRoundScore = null;
      this.ls.currentGame.currentQuestion = this.currentQuestion;
      localStorage.dailyQuiz = JSON.stringify(this.ls);
      if (this.currentQuestion === 4) {
        this.altButtonName = "COMPLETE";
      } else {
        this.altButtonName = "";
      }
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
    this.quizSet = response.quizSet;
    this.ls = this.lsObj;
    this.ls.currentGame.id = response.id;
    const dateToday = new Date();
    this.ls.currentGame.utcDate = `${dateToday.getUTCDate()}/${
      dateToday.getUTCMonth() + 1
    }/${dateToday.getUTCFullYear()}`;

    if (this.ls.currentGame.score > 0) {
      this.$emit("updateTotalScore", this.ls.currentGame.score);
      this.totalScore = this.ls.currentGame.score;
    }
    this.calculateButtonClass();
  },
};
</script>

<style scoped>
.game-window {
  padding: 10px 0;
  border-radius: 1em;
  max-width: 90%;
  width: 960px;
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.8);
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
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
}
.incorrect:hover {
  color: white;
}

.unselected {
  opacity: 0.4;
}

.next-button {
  width: 100px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0);
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1em;
  color: gray;
  transition: 0.2s all;
}

.button-enabled {
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
}
.button-enabled:hover {
  color: white;
  background-color: #565652;
  border: 1px solid #565652;
}
.button-enabled:active {
  transform: scale(0.9);
}

.button-disabled {
  background-color: rgba(255, 255, 255, 0.4);
  color: gray;
  pointer-events: none;
}
</style>
