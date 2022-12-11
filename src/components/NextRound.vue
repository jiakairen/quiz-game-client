<template>
  <div class="next-round">
    <h1>Next: Question {{ next }}</h1>
    <StartButton />
  </div>
</template>

<script>
import StartButton from "../components/StartButton.vue";

export default {
  name: "NextRound",
  data() {
    return {
      next: 3,
    };
  },
  components: {
    StartButton,
  },
};
</script>

<style scoped>
.next-round {
  width: 300px;
  margin: 0 auto;
}
h1 {
  text-align: center;
}
</style>
