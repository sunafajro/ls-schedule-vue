import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'noty/lib/themes/bootstrap-v3.css';
import 'noty/lib/noty.css';

createApp(App).use(store).use(router).mount('#app');
