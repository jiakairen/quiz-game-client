<template>
  <div>
    <div class="game" :class="gameClass">
      <div class="info">
        <TotalScore
          v-if="gameState === 3 || gameState === 4"
          :totalScore="totalScore"
        />
        <CountdownClock v-if="gameState === 4" :stopTimer="stopTimer" />
        <QuestionStepper
          v-if="gameState === 3 || gameState === 4"
          :currentQuestion="currentQuestion"
        />
      </div>
      <StartButton v-if="gameState === 2" @gameState="gameState = $event" />
      <GameWindow
        v-if="gameState === 3 || gameState === 4"
        @gameState="gameState = $event"
        :currentQuestion="currentQuestion"
        @changeCurrentQ="currentQuestion = $event"
        @changeTimerStatus="stopTimer = $event"
        @updateTotalScore="totalScore = $event"
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
      @gameState="gameState = $event"
    />
    <EndOfGame v-if="gameState === 5" />
    <!-- <NextRound /> -->
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

// import NextRound from "../components/NextRound.vue";

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
    // showInstructions: function () {
    //   this.generateGameClass();
    // },
    // threeTwoOneAtZero: function () {
    //   this.generateGameClass();
    // },
    gameState: function () {
      this.generateGameClass();
    },
  },
  mounted() {
    this.generateGameClass();
    this.gameState = 2;
    this.$root.$on("stepping", ($event) => (this.currentQuestion = $event));
  },
};
</script>

<style scoped>
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
  background-color: white;
}
.blurred {
  filter: blur(15px);
  pointer-events: none;
}
</style>
