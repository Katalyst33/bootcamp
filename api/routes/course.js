const express = require("express");

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

const Courses = require("../../server/models/Course");

const advancedResults = require("../middleware/advancedResults");

//Include other resources routes
const enrollmentRouter = require("./enrollments");
const reviewRouter = require("./reviews");
const courseReviewRouter = require("./course-review");



//merge route with bootcamp route
const router = express.Router({
  mergeParams: true,
});

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:courseId/reviews", reviewRouter);
router.use("/:courseId/course-review", courseReviewRouter);
router.use("/:courseId/enrollment", enrollmentRouter);



router
  .route("/")
  .get(
    advancedResults(Courses, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
