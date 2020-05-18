import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      name: process.env["VUE_APP_NAME"] || "{env.APP_NAME}",
      slogan: "Learn more, enhance your skills",
      domain: process.env["VUE_APP_DOMAIN"] || "{env.APP_DOMAIN}",
      email: process.env["VUE_APP_EMAIL"] || "{env.APP_EMAIL}",
      address: process.env["VUE_APP_ADDY"] || "{env.APP_ADDY}",
      telephone: process.env["VUE_APP_NUM"] || "{env.APP_NUM}",
    },
    userDetails: {
      email: "",
      password: "",
    },
  },

  actions: {
    getCurrentUser() {
      console.log("hey Travis");
    },

    loginUser(context) {
      context.commit("LOGIN_USER");
    },
    /* async loginUser({ commit }, { form }) {
      // function navigate(ms) {
      //   return new Promise(resolve => setTimeout(resolve, ms));
      // }

      try {
        const { data } = await this.$http.post("/api/v1/auth/login", this.form);

        // this.notification.success = `welcome back`;
        // localStorage.setItem("token", data.token);
        console.log(`user data ${data.token}`);
        console.log(`user data ${data}`);
        commit("SET_USER", user);
        // await navigate(3000);
        // this.$router.push({name: 'AddBootcamp'});
      } catch (e) {
        console.log(e);
        // this.notification.error = "Invalid Details";
      }
    },*/
  },

  getters: {
    getUserDetails: (state) => {
      return state.userDetails.email;
    },
  },
  mutations: {},
  modules: {},
});
