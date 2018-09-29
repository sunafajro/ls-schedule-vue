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
      name: "schedule",
      component: Schedule,
      props: true
    },
    {
      path: "/hours",
      name: "hours",
      component: Hours,
      //component: () => import("./components/Hours.vue"),
      props: true
    },
    {
      path: "/create",
      name: "create",
      component: Create,
      //component: () => import("./components/Create.vue"),
      props: true
    }
  ]
});
