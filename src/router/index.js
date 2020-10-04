import { createRouter, createWebHistory } from 'vue-router'
import Schedule from '../components/Schedule.vue';
import Hours from '../components/Hours.vue';
import Create from '../components/Create.vue';
import Update from '../components/Update.vue';

const el = document.getElementById('app');
const urlPrefix = el.dataset.urlPrefix;

const routes = [
  {
    path: `${urlPrefix}/schedule/index`,
    name: 'schedule',
    component: Schedule,
    props: true,
  },
  {
    path: `${urlPrefix}/schedule/hours`,
    name: 'hours',
    component: Hours,
    props: true,
  },
  {
    path: `${urlPrefix}/schedule/create`,
    name: 'create',
    component: Create,
    props: true,
  },
  {
    path: `${urlPrefix}/schedule/update/:id`,
    name: 'update',
    component: Update,
    props: true,
  },
];

routes.push({ path: `${urlPrefix}/schedule`, redirect: `${urlPrefix}/schedule/index` });

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
