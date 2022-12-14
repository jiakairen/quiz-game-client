<template>
  <div class="three-two-one">
    <p>{{ num }}</p>
  </div>
</template>

<script>
export default {
  name: "ThreeTwoOne",
  data() {
    return {
      num: 3,
      intervalID: null,
    };
  },
  methods: {
    countdown() {
      this.intervalID = setInterval(() => {
        this.num--;
      }, 1000);
      return;
    },
  },
  mounted() {
    this.countdown();
  },
  watch: {
    num: function () {
      if (this.num === 0) {
        clearInterval(this.intervalID);
        this.intervalID = null;
        this.$emit("threeTwoOneAtZero", true);
        this.$emit("gameState", 4);
      }
      return;
    },
  },
};
</script>

<style scoped>
.three-two-one {
  height: 200px;
  width: 200px;
  border: 1px solid black;
  text-align: center;
  color: black;
}
.three-two-one p {
  font-size: 60px;
}
</style>
