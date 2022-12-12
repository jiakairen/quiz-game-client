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
  border: 1px solid black;
  height: 50px;
  width: 100px;
  text-align: center;
}
</style>
