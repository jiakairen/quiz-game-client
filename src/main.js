import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import underscore from "vue-underscore";

Vue.use(underscore);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
