const express = require("express");

const { getCourses, getCourse } = require("../controller/courses");

//merge route with bootcamp route
const router = express.Router({
  mergeParams: true,
});

router.route("/").get(getCourses);
router.route("/:id").get(getCourse);

module.exports = router;
