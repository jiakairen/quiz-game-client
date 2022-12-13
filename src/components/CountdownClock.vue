<template>
  <div class="clock-container">
    <p>00:{{ padZero(seconds, 2) }}</p>
  </div>
</template>

<script>
export default {
  name: "CoundownClock",
  data() {
    return {
      seconds: 10,
      intervalID: null,
    };
  },
  methods: {
    padZero(num, places) {
      return String(num).padStart(places, "0");
    },
    countdown() {
      this.intervalID = setInterval(() => {
        this.seconds--;
      }, 1000);
      return;
    },
  },
  mounted() {
    this.countdown();
  },
  watch: {
    seconds: function () {
      if (this.seconds === 0 || this.stopTimer) {
        clearInterval(this.intervalID);
        this.intervalID = null;
        this.$root.$emit("timerStopped", this.seconds);
        if (this.seconds === 0) {
          this.$emit("timeOut", true);
        }
      }
      return;
    },
  },
  props: ["stopTimer"],
};
</script>

<style scoped>
.clock-container {
  width: 100px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
}
</style>
