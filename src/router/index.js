import Vue from "vue";
import Router from "vue-router";

import HomePage from "../views/HomePage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "homepage",
      component: HomePage,
    },
  ],
});
