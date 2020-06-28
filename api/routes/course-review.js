const express = require("express");

const {
  addCourseReview,
  getCourseReviews,
  getCourseReview,
  updateCourseReview,
  deleteCourseReview

} = require("../controller/course-review");

const CourseReview = require("../models/course-review");

//merge route with course route
const router = express.Router({
  mergeParams: true
});


const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require("../middleware/auth");


router
.route("/")
  .get(
    advancedResults(CourseReview,{
      path: "course",
      select: "title",
    }),getCourseReviews
  )
.post(protect, authorize("user", "admin"), addCourseReview);

router
  .route("/:id")
  .get(getCourseReview)
  .put(protect, authorize("user", "admin"), updateCourseReview)
  .delete(protect, authorize("user", "admin"),  deleteCourseReview)




module.exports = router;
