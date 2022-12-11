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
      seconds: 30,
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
      if (this.seconds === 0) {
        clearInterval(this.intervalID);
        this.intervalID = null;
      }
      return;
    },
  },
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
