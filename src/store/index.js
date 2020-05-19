import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    user: "",
  },

  actions: {
    /* getCurrentUser() {
      console.log("hey Travis");
    },*/

    getCurrentUser: (context) => {
      /*   setTimeout(function () {

      }, 1000);*/

      axios
        .get("/api/v1/auth/me")
        .then(({ data }) => {
          console.log("vuex user here", data);
          let user = data;
          context.commit("SET_USER", user);
        })
        .catch((e) => {
          console.log("error message ", e);
        });
    },
  },

  mutations: {
    SET_USER: (state, user) => {
      console.log("before request", user);
      state.user = user;
      console.log("mutation arror here", user);
    },
  },

  /*SET_USER(state, user) {
      state.user = user;
    },
  },*/
  modules: {},
});
