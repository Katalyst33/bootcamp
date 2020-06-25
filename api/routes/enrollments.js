const express = require("express");

const { addEnrollment } = require("../controller/enrollments");

const Enrollment = require("../models/Enrollment");

//merge route with bootcamp route
const router = express.Router({
  mergeParams: true,
});

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user", "admin", "publisher"), addEnrollment);

router.route("/:id");

module.exports = router;
