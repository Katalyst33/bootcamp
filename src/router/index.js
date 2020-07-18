import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginAndRegister from "../views/LoginAndRegister";
import notFound from "../views/404.vue";
import store from "../store/index";

const About = () =>
  import(/* webpackChunkName: "about" */ "../views/About.vue");
const Cart = () =>
  import(/* webpackChunkName: "about" */ "../views/Cart");
const Bootcamps = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/Bootcamps");
const ViewBootcamp = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/ViewBootcamp.vue");
const ViewCourse = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/ViewCourse.vue");

const Review = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/Review.vue");

const AddAndUpdateReview = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/AddAndUpdateReviewCourse");

const UpdateAndReset = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/account/UpdateAndReset.vue");

Vue.use(VueRouter);

import xxRoutes from "./xxxRoutes";
import accountRoutes from "./accountRoutes";


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
  accountRoutes,

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
    path: "/cart",
    name: "Cart",
    component: Cart,
  },


  {
    path: "/add-reviews/:courseId",
    name: "AddReview",

    component: AddAndUpdateReview,
  },
  {
    path: "/update-reviews/:reviewId",
    name: "UpdateReview",
    component: AddAndUpdateReview,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
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

