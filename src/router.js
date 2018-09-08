import Vue from "vue";
import Router from "vue-router";
import Schedule from "./components/Schedule.vue";
import Hours from "./components/Hours.vue";
import Create from "./components/Create.vue";

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
      component: Hours,
      //component: () => import("./components/Hours.vue"),
      props: true
    },
    {
      path: "/schedule/create",
      name: "create",
      component: Create,
      //component: () => import("./components/Create.vue"),
      props: true
    }
  ]
});
