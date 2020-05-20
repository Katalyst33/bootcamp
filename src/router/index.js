import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginAndRegister from "../views/LoginAndRegister";

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
  //admin routes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
