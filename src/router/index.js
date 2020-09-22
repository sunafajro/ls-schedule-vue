import { createRouter, createWebHistory } from 'vue-router'
import Schedule from '../components/Schedule.vue';
import Hours from '../components/Hours.vue';
import Create from '../components/Create.vue';
import Update from '../components/Update.vue';

const routes = [
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
  {
    path: '/schedule/update/:id',
    name: 'update',
    component: Update,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
