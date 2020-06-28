const express = require("express");

const {
  addCourseReview
} = require("../controller/course-review");

// const CourseReview = require("../models/course-review");

//merge route with course route
const router = express.Router({
  mergeParams: true
});


// const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require("../middleware/auth");


router
.route("/")
.post(protect, authorize("user", "admin"), addCourseReview);



module.exports = router;
