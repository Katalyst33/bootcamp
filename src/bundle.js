import axios from "axios";
import "./scss/app.scss";
import Vue from "vue";
import VueBreadcrumbs from 'vue-2-breadcrumbs'
import JSONView from "vue-json-component";
import VueSweetalert2 from "vue-sweetalert2";
import "./scss/sweetAlertCustom.scss";

Vue.use(JSONView);
Vue.use(VueSweetalert2);
Vue.use(VueBreadcrumbs);

Vue.prototype.$http = axios;
