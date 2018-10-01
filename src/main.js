import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "noty/lib/themes/bootstrap-v3.css";
import "noty/lib/noty.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
