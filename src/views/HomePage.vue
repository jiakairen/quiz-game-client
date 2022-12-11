<template>
  <div>
    <div class="game" :class="gameClass">
      <div class="info">
        <CountdownClock />
        <QuestionStepper />
      </div>
      <StartButton />
    </div>
    <GameWindow />
    <ThreeTwoOne
      v-if="!threeTwoOneAtZero"
      class="three-two-one"
      @threeTwoOneAtZero="threeTwoOneAtZero = $event"
    />
    <InstructionPage
      v-if="showInstructions"
      class="instruction-popup"
      @showInstructions="showInstructions = $event"
    />
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
// import NextRound from "../components/NextRound.vue";

export default {
  name: "homePage",
  data() {
    return {
      showInstructions: false,
      threeTwoOneAtZero: false,
      gameClass: "",
    };
  },
  methods: {
    generateGameClass() {
      if (this.showInstructions || !this.threeTwoOneAtZero) {
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
    // NextRound,
  },
  watch: {
    showInstructions: function () {
      this.generateGameClass();
    },
    threeTwoOneAtZero: function () {
      this.generateGameClass();
    },
  },
  mounted() {
    this.generateGameClass();
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
