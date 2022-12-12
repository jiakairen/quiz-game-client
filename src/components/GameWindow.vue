<template>
  <div class="game-window">
    <QuizQuestion
      :question="quizSet[currentQ]?.question || 'loading'"
      :currentQ="currentQ"
    />
    <QuizChoice
      :option="quizSet[currentQ]?.correctAnswer || 'loading'"
      :optionName="'A'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.A"
      :tailText="tailText.A"
    />
    <QuizChoice
      :option="quizSet[currentQ]?.incorrectAnswers[0] || 'loading'"
      :optionName="'B'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.B"
      :tailText="tailText.B"
    />
    <QuizChoice
      :option="quizSet[currentQ]?.incorrectAnswers[1] || 'loading'"
      :optionName="'C'"
      @optionSelected="choiceMade($event)"
      :class="optionClass.C"
      :tailText="tailText.C"
    />
    <QuizChoice
      :option="quizSet[currentQ]?.incorrectAnswers[2] || 'loading'"
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

import { api } from "../helpers/helpers";

export default {
  name: "GameWindow",
  data() {
    return {
      quizSet: [],
      currentQ: 0,
      thisRoundSelected: "",
      thisRoundPlayed: false,
      thisRoundCorrect: "A",
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
    };
  },
  methods: {
    choiceMade($event) {
      if (this.thisRoundPlayed) return;
      this.thisRoundSelected = $event;
      this.thisRoundPlayed = true;
    },
    nextQuestion() {
      if (this.currentQ === 4) return;
      this.tailText[this.thisRoundSelected] = null;
      this.currentQ++;
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
    calculateScore(optionName) {
      if (optionName === this.thisRoundCorrect) {
        this.tailText[optionName] = "+100 points";
        return;
      } else {
        this.tailText[optionName] = "+0 points";
        return;
      }
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
      this.calculateScore(this.thisRoundSelected);
    },
    currentQ: function () {
      this.$root.$emit("stepping", this.currentQ);
    },
  },
  async mounted() {
    this.quizSet = (await api.getQuiz()).quizSet;
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
