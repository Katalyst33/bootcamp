import axios from "axios";
import "./scss/app.scss";
import Vue from "vue";
import JSONView from "vue-json-component";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(JSONView);
Vue.use(VueSweetalert2);

Vue.prototype.$http = axios;
