import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'noty/lib/themes/bootstrap-v3.css';
import 'noty/lib/noty.css';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
