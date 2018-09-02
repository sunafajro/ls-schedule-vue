import Vue from "vue";
import Router from "vue-router";
import Schedule from "./components/Schedule.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/schedule/index"
    },
    {
      path: "/schedule",
      redirect: "/schedule/index"
    },
    {
      path: "/schedule/index",
      name: "schedule",
      component: Schedule,
      props: true
    },
    {
      path: "/schedule/hours",
      name: "hours",
      component: () => import("./components/Hours.vue"),
      props: true
    },
    {
      path: "/schedule/create",
      name: "create",
      component: () => import("./components/Create.vue"),
      props: true
    }
  ]
});
