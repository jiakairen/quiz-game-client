import axios from "axios";
import Vue from "vue";
import VueFlashMessage from "vue-flash-message";
import "vue-flash-message/dist/vue-flash-message.min.css";

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});

const vueInstance = new Vue();
const baseURL = "http://localhost:1337/request";
// const baseURL = "https://protected-peak-86063.herokuapp.com/request";

const handleError =
  (fn) =>
  (...params) =>
    fn(...params).catch((error) => {
      vueInstance.flash(
        `${error.response.status}: ${error.response.statusTest}`,
        "error"
      );
    });

export const api = {
  getQuiz: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
};
