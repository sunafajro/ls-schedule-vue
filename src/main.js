import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faClock, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "bootstrap/dist/css/bootstrap.css";

library.add(faCalendarAlt, faClock, faFilter, faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
