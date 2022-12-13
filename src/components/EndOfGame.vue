<template>
  <div class="end-of-game-summary">
    <h2>End of Game Summary</h2>
    <div class="current-past">
      <div class="current-game">
        <h4>Today's Summary</h4>
        <p>Game ID: {{ currentGameStats?.gameID || "loading" }}</p>
        <p>Date:</p>
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
          <div v-for="(b, i) in boxes" :key="i" class="box">{{ b }}</div>
          <div class="view-questions-div">
            <p>View Questions</p>
          </div>
        </div>
      </div>
      <div class="past-stats">
        <h4>Past Statistics</h4>
        <p>Total Question:</p>
        <p>Total Correct:</p>
        <p>Total Incorrect:</p>
        <p>Total Score:</p>
        <p>Average Score Per Day:</p>
        <p>Average Time Per Question:</p>
        <p>Average Correct:</p>
        <p>Current Streak: days</p>
        <p>Max Streak: days</p>
        <div class="view-charts-div"><p>View Charts</p></div>
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
  margin: 10px 0 10px 0;
  padding: 10px 20px 10px 20px;
  border-right: 1px solid black;
  width: 38.2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.past-stats {
  margin: 10px;
  padding: 10px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.current-game p,
.past-stats p {
  margin: 5px 0;
}

.question-boxes {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding-left: 15px;
  border-radius: 1.5em;
  overflow: hidden;
}

.box {
  display: flex;
  align-items: center;
}

.large-text {
  font-weight: bold;
  font-size: 150%;
}

.view-questions-div {
  border-left: 1px solid black;
  padding-left: 10px;
  transition: 0.2s all;
}
.view-questions-div p {
  margin: 5px 10px 5px 0;
}
.view-questions-div:hover {
  background-color: black;
  color: white;
}

.view-charts-div {
  border: 1px solid black;
  border-radius: 1.5em;
  transition: 0.2s all;
  width: 100%;
}
.view-charts-div p {
  margin: 5px;
  text-align: center;
}
.view-charts-div:hover {
  background-color: black;
  color: white;
}
/* @media (max-width: 760px) {
  .question-boxes {
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0px;
    padding-top: 10px;
  }
  .view-questions-div {
    border-left: 0px;
    border-top: 1px solid black;
    padding-left: 0px;
  }
  .view-questions-div p {
    margin: 10px;
    text-align: center;
  }
} */
/* .button-enabled:hover {
  color: white;
  background-color: black;
} */

/* .q-box {
  width: 25px;
  height: 25px;
  border: 1px solid black;
  margin: 0 5px;
  border-radius: 100%;
} */
</style>
