const index = () =>
  import(/* webpackChunkName: "Admin" */ "../views/account/index");
const UpdateAndReset = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/account/UpdateAndReset.vue");

const Enrollments = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/account/Enrollments.vue");

const Transactions = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/account/Transactions.vue");

const Reviews = () =>
  import(/* webpackChunkName: "bootcamp" */ "../views/account/Reviews.vue");



const vuexLocal = JSON.parse(localStorage.getItem("vuex"));

export default {
  path: "/account",
  component: index,
  beforeEnter: (to, from, next) => {
    if ([].includes(vuexLocal.user.role)) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  },

  children: [
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
      path: "/enrollments",
      name: "Enrollments",
      component: Enrollments,
    },
    {
      path: "/transactions",
      name: "Transactions",
      component: Transactions,
    },
    {
      path: "/reviews",
      name: "Reviews",
      component: Reviews,
    },
  ],
};
