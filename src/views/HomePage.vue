<template>
  <div>
    <div class="game" :class="gameClass">
      <div class="info">
        <TotalScore
          v-if="gameState === 3 || gameState === 4"
          :totalScore="totalScore"
        />
        <CountdownClock
          v-if="gameState === 4 && currentQuestion !== -1"
          :stopTimer="stopTimer"
          @timeOut="timeOut = $event"
        />
        <QuestionStepper
          v-if="gameState === 3 || gameState === 4"
          :currentQuestion="currentQuestion"
        />
      </div>
      <StartButton
        v-if="gameState === 2"
        @gameState="gameState = $event"
        :startButtonMessage="startButtonMessage"
      />
      <GameWindow
        v-if="gameState === 3 || gameState === 4"
        @gameState="gameState = $event"
        :currentQuestion="currentQuestion"
        @changeCurrentQ="currentQuestion = $event"
        @changeTimerStatus="stopTimer = $event"
        @updateTotalScore="totalScore = $event"
        :timeOut="timeOut"
        :lsObj="lsObj"
      />
    </div>
    <ThreeTwoOne
      v-if="gameState === 3"
      class="three-two-one"
      @threeTwoOneAtZero="threeTwoOneAtZero = $event"
      @gameState="gameState = $event"
    />
    <InstructionPage
      v-if="showInstructions && gameState === 1"
      class="instruction-popup"
      @showInstructions="showInstructions = $event"
      @gameState="dismissInstructions($event)"
    />
    <EndOfGame
      v-if="gameState === 5"
      :lsObj="lsObj"
      @gameState="gameState = $event"
    />
  </div>
</template>

<script>
import InstructionPage from "../components/InstructionPage.vue";
import CountdownClock from "../components/CountdownClock.vue";
import QuestionStepper from "../components/QuestionStepper.vue";
import StartButton from "../components/StartButton.vue";
import ThreeTwoOne from "../components/ThreeTwoOne.vue";
import GameWindow from "../components/GameWindow.vue";
import EndOfGame from "../components/EndOfGame.vue";
import TotalScore from "../components/TotalScore.vue";

const objTemplate = {
  currentGame: {
    id: null,
    utcDate: null,
    selections: ["", "", "", "", "", "", "", "", "", ""],
    correct: ["", "", "", "", "", "", "", "", "", ""],
    time: [null, null, null, null, null, null, null, null, null, null],
    currentQuestion: null,
    gameState: null,
    score: 0,
  },
  stats: {
    latestStatsGameID: null,
    lastGameID: null,
    weekWin: [0, 0, 0, 0, 0, 0, 0],
    weekTime: [0, 0, 0, 0, 0, 0],
    weekPoints: [0, 0, 0, 0, 0, 0, 0],
    totCorrect: 0,
    totQuestions: 0,
    totTime: 0,
    currentStreak: 0,
    maxStreak: 0,
    isOnStreak: false,
    totPoints: 0,
    hasPlayed: false,
  },
  quizSet: {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  },
};

export default {
  name: "homePage",
  data() {
    return {
      showInstructions: true,
      threeTwoOneAtZero: false,
      gameClass: "",
      gameState: null,
      currentQuestion: -1,
      stopTimer: false,
      totalScore: null,
      timeOut: false,
      lsObj: null,
      startButtonMessage: "",
    };
  },
  methods: {
    generateGameClass() {
      if (this.gameState === 1 || this.gameState === 3) {
        this.gameClass = "blurred";
      } else {
        this.gameClass = "";
      }
      return;
    },
    dismissInstructions(e) {
      this.gameState = e;
      this.lsObj.stats.hasPlayed = true;
      localStorage.dailyQuiz = JSON.stringify(this.lsObj);
    },
  },
  components: {
    InstructionPage,
    CountdownClock,
    QuestionStepper,
    StartButton,
    ThreeTwoOne,
    GameWindow,
    EndOfGame,
    TotalScore,
  },
  watch: {
    gameState: function () {
      this.generateGameClass();
      this.timeOut = false;
      this.lsObj.currentGame.gameState = this.gameState;
      localStorage.dailyQuiz = JSON.stringify(this.lsObj);
    },
  },
  mounted() {
    this.generateGameClass();
    this.gameState = 1;
    this.$root.$on("stepping", ($event) => (this.currentQuestion = $event));
    if (localStorage.dailyQuiz) {
      const obj = JSON.parse(localStorage.dailyQuiz);
      if (!obj.quizSet) {
        obj.quizSet = {
          0: "",
          1: "",
          2: "",
          3: "",
          4: "",
          5: "",
          6: "",
          7: "",
          8: "",
          9: "",
        };
      }
      this.lsObj = obj;

      const hasPlayed = obj.stats.hasPlayed;
      const gameState = obj.currentGame.gameState;
      const currentQ = obj.currentGame.currentQuestion;
      const lsID = obj.currentGame.id;

      if (lsID === Math.floor(new Date().getTime() / 86400000)) {
        if (gameState) {
          if (gameState === 4) {
            this.gameState = 2;
          } else {
            this.gameState = gameState;
          }
        }

        if (currentQ === 9) {
          this.gameState = 5;
        } else if (currentQ >= 0) {
          this.startButtonMessage = `Next: Question ${currentQ + 2}`;
          this.currentQuestion = currentQ;
        }
      } else {
        if (hasPlayed) {
          this.gameState = 2;
        }
        this.lsObj.currentGame = objTemplate.currentGame;
      }
    } else {
      this.lsObj = objTemplate;
      const myJSON = JSON.stringify(objTemplate);
      localStorage.setItem("dailyQuiz", myJSON);
    }
  },
};
</script>

<style scoped>
.game {
  padding-top: 5px;
}
.info {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
.instruction-popup,
.three-two-one {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
.blurred {
  filter: blur(15px);
  pointer-events: none;
}
</style>
