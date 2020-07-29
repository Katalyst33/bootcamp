import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage,
  reducer: (state) => ({
    user: state.user,
    carts: state.carts
  })
});

export default new Vuex.Store({
  state: {
    config: {
      name: process.env["VUE_APP_NAME"] || "{env.APP_NAME}",
      slogan: "Learn more, enhance your skills",
      domain: process.env["VUE_APP_DOMAIN"] || "{env.APP_DOMAIN}",
      email: process.env["VUE_APP_EMAIL"] || "{env.APP_EMAIL}",
      address: process.env["VUE_APP_ADDY"] || "{env.APP_ADDY}",
      telephone: process.env["VUE_APP_NUM"] || "{env.APP_NUM}"
    },
    user: null,
    loaded: true,
    carts: []
  },

  actions: {

    getCurrentUser: (context) => {
      setTimeout(function() {
        axios
          .get("/api/v1/auth/me")
          .then(({ data: { data } }) => {
            context.commit("SET_USER", data);
          })
          .catch((error) => {
            return console.log("get Me error ", error.response.data.error);
          });
      }, 100);
    },

    async addCartItem() {


      if (this.state.user) {
        await axios.post("/api/v1/cart", this.state.carts);
      }
      console.log("CART STATE", this.state.carts);
    },

    async getCartItem({commit}) {
      // const { data: { carts: { courses } } } = await axios.get("/api/v1/cart");
      const data = await axios.get("/api/v1/cart");
      commit("GET_CART", data.data.cart.courses);
      console.log("GET_CART",data.data.cart.courses)
    },
    clearCart() {
      this.state.carts = "";
    }

  },

  mutations: {

    GET_CART: (state, cart) => {
      state.cart = cart;
    },

    PUSH_TO_CART(state, cartItem) {

      state.carts.push(cartItem);
      console.log(state.carts);
    },

    REMOVE_FROM_CART: (state, course) => {
      state.carts = state.carts.filter((item) => {

        return item._id !== course._id;
      });
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_STATUS: (state, authenticated) => {
      state.authenticated = authenticated;
    }
  },

  getters: {
    coursesInCart: (state) => {
      const courseIds = [];

      for (const course of state.carts) {
        courseIds.push(course._id);
      }

      return courseIds;
    },

    coursesInCartWithPrices: (state) => {
      const courseIds = [];

      for (const course of state.carts) {
        courseIds.push({
          id: course._id,
          price: course.tuition
        });
      }

      return courseIds;
    }
  },

  modules: {},

  plugins: [vuexLocal.plugin]
});
