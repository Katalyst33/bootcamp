const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

const User = require("../../server/models/User");

//merge route with bootcamp route
const router = express.Router({
  mergeParams: true,
});
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

//Include other resoures router
const enrollmentRouter = require("./enrollments");
const reviewRouter = require("./course-review");

router.use(protect);
router.use(authorize("user"));

//Re- route into other resource routers
router.use("/:userId/enrollments", enrollmentRouter)
router.use("/:userId/reviews",advancedResults(User, "user"), authorize("user"), reviewRouter)

router.route("/").get(protect, authorize("admin"), advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
