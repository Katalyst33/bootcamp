import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  reducer: (state) => ({
    user: state.user,
  }),
});

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
    user: {
      data: {
        role: "",
      },
    },
    loaded: true,
  },

  actions: {
    getCurrentUser: (context) => {
      setTimeout(function () {
        axios
          .get("/api/v1/auth/me")
          .then(({ data }) => {
            context.commit("SET_USER", data);
          })
          .catch((error) => {
            return console.log("get Me error ", error.response.data.error);
          });
      }, 100);
    },
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_STATUS: (state, authenticated) => {
      state.authenticated = authenticated;
    },
  },

  modules: {},

  plugins: [vuexLocal.plugin],
});
