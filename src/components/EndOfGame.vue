<template>
  <div>
    <div class="end-of-game-summary" :class="summaryClass">
      <h2>You've completed today's quiz!</h2>
      <div class="current-past">
        <div class="current-game">
          <div class="next-game">
            <h4>Next Game In</h4>
            <p v-if="!newGameReady">
              {{
                (countdownHH || "--") +
                " : " +
                (countdownMM || "--") +
                " : " +
                (countdownSS || "--")
              }}
            </p>
            <div
              class="view-charts-div"
              @click="playNewQuiz"
              v-if="newGameReady"
            >
              <p>PLAY NEW QUIZ NOW</p>
            </div>
          </div>
          <div class="todays-summary">
            <h4>Today's Summary</h4>
            <p>Game ID: {{ currentGameStats?.gameID || "loading" }}</p>

            <p>Date: {{ currentGameStats?.date }} (UTC)</p>

            <p>
              Total Score:
              <span class="large-text">
                {{ currentGameStats?.score }}
              </span>
              / 500 ({{ Math.round((currentGameStats?.score / 500) * 100) }}%)
            </p>

            <p>
              Avg. Time Per Question:
              <span class="large-text">
                {{ currentGameStats?.aveTime.toFixed(1) }}
              </span>
              s
            </p>

            <p>
              Total Correct:
              <span class="large-text">
                {{ currentGameStats?.correctTot }}
              </span>
              / 5 ({{ (currentGameStats?.correctTot / 5) * 100 }}%)
            </p>

            <div class="question-boxes">
              <div v-for="(b, i) in boxes" :key="i" class="box">{{ b }}</div>
              <div class="view-questions-div" @click="showReview = true">
                <p>REVIEW</p>
              </div>
            </div>
          </div>
        </div>
        <div class="past-stats">
          <h4>Overall Statistics</h4>

          <p>
            Total Questions Answered:
            <span class="large-text">
              {{ pastStats?.totalQuestionsAnswered }}
            </span>
          </p>

          <p>
            Total Correct Answers:
            <span class="large-text">
              {{ pastStats?.totalCorrectAnswers }}
            </span>
            ({{ pastStats?.totalCorrectPerc }}%)
          </p>

          <p>
            Total Incorrect Answers:
            <span class="large-text">
              {{ pastStats?.totalIncorrectAnswers }}
            </span>
            ({{ pastStats?.totalIncorrectPerc }}%)
          </p>

          <p>
            Total Score Earned:
            <span class="large-text">
              {{ pastStats?.totalScoreEarned }}
            </span>
            /
            {{ pastStats?.totalScoreAvailable }} ({{
              pastStats?.totalScorePerc
            }}%)
          </p>

          <p>
            Avg. Score Per Day:
            <span class="large-text">
              {{ Math.round(pastStats?.avgScorePerDay) }}
            </span>
            / 500 ({{ pastStats?.totalScorePerc }}%)
          </p>

          <p>
            Avg. Correct Per Day:
            <span class="large-text">
              {{ pastStats?.aveCorrect.toFixed(1) }}
            </span>
            / 5 ({{ pastStats?.aveCorrectPerc }}%)
          </p>

          <p>
            Avg. Time Per Question:
            <span class="large-text">
              {{ pastStats?.aveTimePerQuestion.toFixed(1) }}
            </span>
            s
          </p>

          <p>
            Current Streak:
            <span class="large-text">
              {{ pastStats?.currentStreak }}
            </span>
            day<span v-if="pastStats?.currentStreak !== 1">s</span>
          </p>

          <p>
            Maximum Streak:
            <span class="large-text">
              {{ pastStats?.maxStreak }}
            </span>
            day<span v-if="pastStats?.maxStreak !== 1">s</span>
          </p>

          <div class="view-charts-div" @click="showCharts = true">
            <p>VIEW CHARTS</p>
          </div>
        </div>
      </div>
    </div>
    <ReviewQuestions
      class="review-questions"
      v-if="showReview"
      @showReview="showReview = $event"
    />
    <PastCharts
      class="past-charts"
      v-if="showCharts"
      @showCharts="showCharts = $event"
      :chartsData="pastStats"
    />
  </div>
</template>

<script>
import ReviewQuestions from "./ReviewQuestions.vue";
import PastCharts from "./PastCharts.vue";

export default {
  name: "EndOfGame",
  data() {
    return {
      ls: null,
      currentGameStats: null,
      pastStats: null,
      boxes: null,
      countdownHH: null,
      countdownMM: null,
      countdownSS: null,
      newGameReady: false,
      showReview: false,
      showCharts: false,
      summaryClass: "",
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
      const date = ls.utcDate;

      const correctBin = new Array(selections.length).fill(null).map((e, i) => {
        return selections[i] === correct[i] && correct[i] !== "" ? 1 : 0;
      });
      const correctTot = correctBin.reduce((a, b) => a + b);

      const timeArray = time.map((t) => (t === null ? 30 : t));
      const totTimeThisRound = timeArray.reduce((a, b) => a + b);
      const aveTime = totTimeThisRound / timeArray.length;

      this.currentGameStats = {
        gameID: gameID,
        correctBin: correctBin,
        correctTot: correctTot,
        score: score,
        aveTime: aveTime,
        date: date,
        totTimeThisRound: totTimeThisRound,
      };
    },
    calcPastStats() {
      const ls = this.ls.stats;
      let latestStatsGameID = ls.latestStatsGameID;
      if (latestStatsGameID !== this.ls.currentGame.id) {
        if (ls.latestStatsGameID === this.ls.currentGame.id - 1) {
          ls.isOnStreak = true;
          ls.currentStreak += 1;
        } else {
          ls.isOnStreak = false;
          ls.currentStreak = 1;
        }
        if (ls.currentStreak >= ls.maxStreak) {
          ls.maxStreak = ls.currentStreak;
        }
        ls.totQuestions += 5;
        ls.totCorrect += this.currentGameStats.correctTot;
        ls.totPoints += this.currentGameStats.score;
        ls.latestStatsGameID = this.ls.currentGame.id;
        ls.totTime += this.currentGameStats.totTimeThisRound;
        ls.weekWin = ls.weekWin
          .slice(1)
          .concat(this.currentGameStats.correctTot);
        ls.weekTime = ls.weekTime
          .slice(1)
          .concat(this.currentGameStats.aveTime);
        ls.weekPoints = ls.weekPoints
          .slice(1)
          .concat(this.currentGameStats.score);
        localStorage.dailyQuiz = JSON.stringify(this.ls);
      }

      this.pastStats = {
        totalQuestionsAnswered: ls.totQuestions,
        totalCorrectAnswers: ls.totCorrect,
        totalCorrectPerc: Math.round((ls.totCorrect / ls.totQuestions) * 100),
        totalIncorrectAnswers: ls.totQuestions - ls.totCorrect,
        totalIncorrectPerc: Math.round(
          ((ls.totQuestions - ls.totCorrect) / ls.totQuestions) * 100
        ),
        totalScoreEarned: ls.totPoints,
        totalScoreAvailable: ls.totQuestions * 100,
        totalScorePerc: Math.round(ls.totPoints / ls.totQuestions),
        avgScorePerDay: (ls.totPoints / ls.totQuestions) * 5,
        aveTimePerQuestion: ls.totTime / ls.totQuestions,
        aveCorrect: (ls.totCorrect / ls.totQuestions) * 5,
        aveCorrectPerc: Math.round((ls.totCorrect / ls.totQuestions) * 100),
        currentStreak: ls.currentStreak,
        maxStreak: ls.maxStreak,
        weekWin: ls.weekWin,
        weekTime: ls.weekTime,
        weekPoints: ls.weekPoints,
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
    calculateCountDown() {
      const remaining = (1 - ((new Date().getTime() / 86400000) % 1)) * 24;
      this.countdownHH = Math.floor(remaining).toString().padStart(2, "0");
      this.countdownMM = Math.floor((remaining * 60) % 60)
        .toString()
        .padStart(2, "0");
      this.countdownSS = Math.floor((remaining * 3600) % 60)
        .toString()
        .padStart(2, "0");
    },
    playNewQuiz() {
      this.$emit("gameState", 2);
    },
    generateSummaryClass() {
      if (this.showReview || this.showCharts) {
        this.summaryClass = "blurred";
      } else {
        this.summaryClass = "";
      }
      return;
    },
  },
  mounted() {
    this.ls = this.lsObj;
    setInterval(() => {
      this.calculateCountDown();
    }, 1000);
  },
  watch: {
    ls: function () {
      this.calcCurrentGameStats();
      this.boxes = this.makeBoxes();
      this.calcPastStats();
    },
    currentGameStats: function () {},
    countdownMM: function () {
      if (
        Math.floor(new Date().getTime() / 86400000) > this.ls.currentGame.id
      ) {
        this.newGameReady = true;
      } else {
        this.newGameReady = false;
      }
    },
    showReview: function () {
      this.generateSummaryClass();
    },
    showCharts: function () {
      this.generateSummaryClass();
    },
  },
  props: ["lsObj"],
  components: {
    ReviewQuestions,
    PastCharts,
  },
};
</script>

<style scoped>
.end-of-game-summary {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 1em;
  max-width: 90%;
  width: 960px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  transition: 0.1s all;
}

h2 {
  text-align: center;
}
.current-past {
  display: flex;
}
.next-game {
  border-bottom: 1px solid #6c6b67;
  padding-bottom: 15px;
}
.current-game {
  margin: 10px 0 10px 0;
  padding: 10px 20px 10px 20px;
  border-right: 1px solid #6c6b67;
  width: 38.2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.todays-summary {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  border: 1px solid rgba(255, 255, 255, 0);
  padding-left: 15px;
  border-radius: 1.5em;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
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
  border-left: 1px solid #6c6b67;
  padding-left: 20px;
  padding-right: 10px;
  transition: 0.2s all;
  cursor: default;
}
.view-questions-div p {
  margin: 5px 10px 5px 0;
  color: black;
}
.view-questions-div:hover {
  background-color: #565652;
}
.view-questions-div:hover > p {
  color: white;
}

.view-charts-div {
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 1.5em;
  transition: 0.2s all;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: default;
}
.view-charts-div p {
  margin: 5px;
  text-align: center;
  color: black;
}
.view-charts-div:hover {
  background-color: #565652;
  border: 1px solid #565652;
}
.view-charts-div:hover > p {
  color: white;
}
.review-questions,
.past-charts {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
.blurred {
  filter: blur(15px);
  pointer-events: none;
}
@media (max-width: 860px) {
  .current-past {
    flex-direction: column;
  }
  .todays-summary {
    padding-bottom: 10px;
  }
  .current-game {
    margin: 0 10px 0 10px;
    border-right: 0px;
    border-bottom: 1px solid #6c6b67;
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .past-stats {
    width: 95%;
  }
  .question-boxes,
  .view-charts-div {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
