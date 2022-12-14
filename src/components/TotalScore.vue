<template>
  <div class="total-score">
    <p>Score: {{ totalScore || 0 }}</p>
  </div>
</template>

<script>
export default {
  name: "totalScore",
  props: ["totalScore"],
};
</script>

<style scoped>
.total-score {
  height: 50px;
  width: 100px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
}
</style>
