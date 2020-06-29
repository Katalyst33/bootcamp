import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginAndRegister from "../views/LoginAndRegister";
import notFound from "../views/404.vue";
import store from "../store/index";

const About = () =>
  import(/* webpackChunkName: "about" */ "../views/About.vue");
const Bootcamps = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/Bootcamps");
const ViewBootcamp = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/ViewBootcamp.vue");
const ViewCourse = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/ViewCourse.vue");

const Review = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/Review.vue");
const AddAndUpdateReview = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/AddAndUpdateReview.vue");

const UpdateAndReset = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/account/UpdateAndReset.vue");

Vue.use(VueRouter);

import xxRoutes from "./xxxRoutes";

const routes = [
  {
    path: "/",
    name: "Home",
    meta:{
      breadcrumb: 'Home'
    },
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
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
    meta:{
      breadcrumb: 'All Bootcamps'
    },
    component: Bootcamps,
  },
  {
    path: "/bootcamp/:id",
    name: "Bootcamp",
    component: ViewBootcamp,
    meta:{
      label: 'All Bootcamps',
      breadcrumb: 'Bootcamp Details'
    },
  },
  {
    path: "/course/:id",
    name: "ViewCourse",
    component: ViewCourse,
  },
  {
    path: "/reviews/:id",
    name: "Reviews",
    component: Review,
  },

  {
    path: "/add-reviews/:id",
    name: "AddReview",

    component: AddAndUpdateReview,
  },
  {
    path: "/update-reviews/:id",
    name: "UpdateReview",
    component: AddAndUpdateReview,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: UpdateAndReset,
  },
  {
    path: "/update-account",
    name: "UpdateAccount",
    component: UpdateAndReset,
  },
  {
    path: "/update-password",
    name: "UpdatePassword",
    component: UpdateAndReset,
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
