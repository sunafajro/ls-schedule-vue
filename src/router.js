import Vue from 'vue';
import Router from 'vue-router';
import Schedule from './components/Schedule.vue';
import Hours from './components/Hours.vue';
import Create from './components/Create.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/schedule/index',
      name: 'schedule',
      component: Schedule,
      props: true,
    },
    {
      path: '/schedule/hours',
      name: 'hours',
      component: Hours,
      props: true,
    },
    {
      path: '/schedule/create',
      name: 'create',
      component: Create,
      props: true,
    },
  ],
});
