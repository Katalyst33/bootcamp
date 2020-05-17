import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./scss/app.scss";

import TheNavBar from "./components/commons/TheNavBar";
import TheFooter from "./components/commons/TheFooter";

Vue.component("Navbar", TheNavBar);
Vue.component("FootArea", TheFooter);

Vue.config.productionTip = false;
import JSONView from "vue-json-component";
Vue.use(JSONView);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
