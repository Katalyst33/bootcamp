import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

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
    path: "/bootcamps",
    name: "AllBootcamps",

    component: () =>
      import(/* webpackChunkName: "bootcamp" */ "../views/Bootcamps.vue"),
  },
  {
    path: "/bootcamp/:id",
    name: "Bootcamp",

    component: () =>
      import(/* webpackChunkName: "bootcamp" */ "../views/ViewBootcamp.vue"),
  },
  {
    path: "/add-bootcamp",
    name: "AddBootcamp",
    component: () =>
      import(
        /* webpackChunkName: "bootcamp" */ "../views/admin/AddBootcamp.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
