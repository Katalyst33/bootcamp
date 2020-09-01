const express = require("express");

const { addEnrollment, getEnrollments } = require("../controller/enrollments");

const Enrollment = require("../../server/models/Enrollment");

//merge route with bootcamp route
const router = express.Router(
  {
    mergeParams: true
  }
);

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");



let populateQuery = [

  {
    path:"course",
    select:"title"
  },
  {
    path:"user",
    select:"name"
  },

]

router
  .route("/")
  .get(
    advancedResults(Enrollment, populateQuery ),
    getEnrollments
  )
  .post(protect, authorize("user", "admin", "publisher"), addEnrollment);

router.route("/:id");

module.exports = router;
