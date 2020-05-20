const index = () =>
  import(/* webpackChunkName: "Help" */ "../views/admin/index");
const AddBootcamp = () =>
  import(/* webpackChunkName: "Help" */ "../views/admin/AddBootcamp");
const ManageBootcamps = () =>
  import(/* webpackChunkName: "Help" */ "../views/admin/ManageBootcamps");

const AllBootcamps = () =>
  import(/* webpackChunkName: "Help" */ "../views/admin/XBootcamps");

export default {
  path: "/xxx",
  component: index,
  children: [
    {
      path: "all-bootcamps",
      name: "AllBootcampX",
      component: AllBootcamps,
    },
    {
      path: "add-bootcamp",
      name: "AddBootcamp",
      component: AddBootcamp,
    },

    {
      path: "manage-bootcamps/:id",
      name: "ManageBootcamp",
      component: ManageBootcamps,
    },
  ],
};
