import axios from "axios";
import "./scss/app.scss";
import Vue from "vue";
import VueBreadcrumbs from 'vue-2-breadcrumbs'
import JSONView from "vue-json-component";
import VueSweetalert2 from "vue-sweetalert2";
import "./scss/sweetAlertCustom.scss";
import  gsap from "gsap"


Vue.use(gsap)
Vue.use(JSONView);
Vue.use(VueSweetalert2);
Vue.use(VueBreadcrumbs);

axios.interceptors.response.use(function(response) {
  if(response.data.error){
    Vue.prototype.$swal.fire({
      icon: "error",
      text: response.data.error
    });

    return undefined;
  }else if(response.data.msg){
    Vue.prototype.$swal.fire({
      icon: "success",
      text: response.data.msg
    });
  }
  return response
})

Vue.prototype.$http = axios;




// console.log(Vue.prototype.$swal)
