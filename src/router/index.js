import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginAndRegister from "../views/LoginAndRegister";
import notFound from "../views/404.vue";
import store from "../store/index";

Vue.use(VueRouter);

import xxRoutes from "./xxxRoutes";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginAndRegister,
  },
  {
    path: "/register",
    name: "register",
    component: LoginAndRegister,
  },
  xxRoutes,

  {
    path: "/bootcamp/",
    name: "AllBootcamps",

    component: () =>
      import(/* webpackChunkName: "bootcamp" */ "../views/Bootcamps"),
  },
  {
    path: "/bootcamp/:id",
    name: "Bootcamp",

    component: () =>
      import(/* webpackChunkName: "bootcamp" */ "../views/ViewBootcamp.vue"),
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: notFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  store,
});

export default router;

/*
setTimeout(() => {
  console.log("vue router store", store.state.user.data.role);
}, 100);
*/

/*

/!*router.beforeEach(*!/(to, from, next) => {
  setTimeout(() => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.state.user.data.role === "user") {
        next({
          name: "login",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }, 100);
});*/
