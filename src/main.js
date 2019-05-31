import Vue from "vue";
import VueCarousel from "vue-carousel";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "./bootstrap.min.css";
import "./mdb.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";

Vue.use(Vuetify, VueCarousel);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
