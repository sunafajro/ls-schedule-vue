import Vue from 'vue';
import Router from 'vue-router';
import Schedule from './components/Schedule.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/schedule"
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/hours',
      name: 'hours',
      component: () => import('./components/Hours.vue')
    }
  ]
})
