import store from "../store/index";

const index = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/index");
const AddBootcamp = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/AddBootcamp");
const ManageBootcamps = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/ManageBootcamps");

const AllBootcamps = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/XBootcamps");

export default {
  path: "/xxx",
  component: index,
  beforeEnter: (to, from, next) => {
    if (store.state.user.data.role !== "admin") {
      next({
        name: "login",
      });
    } else {
      next();
    }
  },

  children: [
    {
      path: "all-bootcamps",
      name: "AllBootcampX",
      component: AllBootcamps,
      meta: { requiresAuth: true },
    },
    {
      path: "add-bootcamp",
      name: "AddBootcamp",
      component: AddBootcamp,
      meta: { requiresAuth: true },
    },

    {
      path: "manage-bootcamps/:id",
      name: "ManageBootcamp",
      component: ManageBootcamps,
      meta: { requiresAuth: true },
    },
  ],
};