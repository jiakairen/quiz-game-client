<template>
  <div class="end-of-game-summary">
    <h2>End of Game Summary</h2>
    <div class="current-past">
      <div class="current-game">
        <h4>Today's summary</h4>
        <p>Game ID: {{ currentGameStats?.gameID || "loading" }}</p>
        <p>
          Total Score:
          <span class="large-text">
            {{ currentGameStats?.score }}
          </span>
          {{
            "/ 500" + ` (${Math.round((currentGameStats?.score / 500) * 100)}%)`
          }}
        </p>
        <p>
          Average Time Per Question:
          <span class="large-text">
            {{ currentGameStats?.aveTime.toFixed(1) + "s" || "loading" }}
          </span>
        </p>
        <p>
          Total Correct:
          <span class="large-text">
            {{ currentGameStats?.correctTot }}
          </span>
          {{
            "/ 5" + ` (${(currentGameStats?.correctTot / 5) * 100}%)` ||
            "loading"
          }}
        </p>
        <div class="question-boxes">
          <div v-for="(b, i) in boxes" :key="i">{{ b }}</div>
        </div>
      </div>
      <div class="past-stats">
        <h4>Past Statistics</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndOfGame",
  data() {
    return {
      ls: null,
      currentGameStats: null,
      boxes: null,
    };
  },
  methods: {
    calcCurrentGameStats() {
      const ls = this.ls.currentGame;
      const gameID = ls.id;
      const score = ls.score;
      const selections = ls.selections;
      const correct = ls.correct;
      const time = ls.time;

      const correctBin = new Array(selections.length).fill(null).map((e, i) => {
        return selections[i] === correct[i] && correct[i] !== "" ? 1 : 0;
      });
      const correctTot = correctBin.reduce((a, b) => a + b);

      const timeArray = time.map((t) => (t === null ? 30 : t));
      const aveTime = timeArray.reduce((a, b) => a + b) / timeArray.length;

      this.currentGameStats = {
        gameID: gameID,
        correctBin: correctBin,
        correctTot: correctTot,
        score: score,
        aveTime: aveTime,
      };
    },
    makeBoxes() {
      const correctBin = this.currentGameStats.correctBin;
      return correctBin.map((c) => {
        if (c === 1) {
          // return `<div class="q-box correct">Y</div>`;
          return "🟢";
        }
        // return `<div class="q-box incorrect">N</div>`;
        return "🔴";
      });
    },
  },
  mounted() {
    this.ls = this.lsObj;
  },
  watch: {
    ls: function () {
      this.calcCurrentGameStats();
      this.boxes = this.makeBoxes();
    },
  },
  props: ["lsObj"],
};
</script>

<style scoped>
.end-of-game-summary {
  border: 1px solid black;
  border-radius: 1em;
  max-width: 90%;
  width: 960px;
  margin: 0 auto;
}

h2 {
  text-align: center;
}
.current-past {
  display: flex;
}
.current-game {
  margin: 10px;
  padding: 10px;
  border-right: 1px solid black;
  width: 38.2%;
}

.past-stats {
  margin: 10px;
  padding: 10px;
}

.question-boxes {
  display: flex;
  width: 100px;
  justify-content: space-around;
}

.large-text {
  font-weight: bold;
  font-size: 150%;
}

/* .q-box {
  width: 25px;
  height: 25px;
  border: 1px solid black;
  margin: 0 5px;
  border-radius: 100%;
} */
</style>
