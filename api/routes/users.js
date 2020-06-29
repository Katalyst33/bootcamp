const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

const User = require("../models/User");

//merge route with bootcamp route
const router = express.Router({
  mergeParams: true,
});
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

//Include other resoures router
const enrollmentRouter = require("./enrollments");


router.use(protect);
router.use(authorize("admin"));

//Re- route into other resource routers
router.use("/:userId/enrollments", enrollmentRouter)

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
