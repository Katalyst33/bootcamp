const index = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/index");
const AddBootcamp = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/AddAndUpdateBootcamp");
const ManageBootcamps = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/ManageBootcamps");

const AllBootcamps = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/AllBootcampsX");

const ManageCourse = () =>
  import(/* webpackChunkName: "Admin" */ "../views/admin/ManageCourse.vue");

const AddAndUpdateCourse = () =>
  import(
    /* webpackChunkName: "Admin" */ "../views/admin/AddAndUpdateCourse.vue"
  );
const vuexLocal = JSON.parse(localStorage.getItem("vuex"));

export default {
  path: "/xxx",
  component: index,
  beforeEnter: (to, from, next) => {
    if (vuexLocal.user.data.role === "user") {
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
      path: "manage-course/:id",
      name: "ManageCourse",
      component: ManageCourse,
      meta: { requiresAuth: true },
    },
    {
      path: "add-course/:id",
      name: "AddCourse",
      component: AddAndUpdateCourse,
      meta: { requiresAuth: true },
    },
    {
      path: "update-course/:id",
      name: "UpdateCourse",
      component: AddAndUpdateCourse,
      meta: { requiresAuth: true },
    },
    {
      path: "update-bootcamp/:id",
      name: "UpdateBootcamp",
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
