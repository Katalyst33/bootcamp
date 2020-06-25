const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

//@desc Add Enrollement
//@route POST /api/v1/bootcamps/:bootcampId/courses
//@access Private
exports.addEnrollment = asyncHandler(async (req, res, next) => {
  const enrollmentData = {
    course: req.params.courseId,
    user: req.user.id,
  };
  const enrollment = await Enrollment.findOne(enrollmentData);

  if (enrollment) {
    return res.json({
      msg: "you have enrolled for this course",
    });
  }

  const course = await Course.findById(enrollmentData.course);
  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.courseId}`, 404)
    );
  }
  enrollmentData.bootcamp = course.bootcamp;

  console.log("bootcamp id", course.bootcamp);
  console.log(req.body);
  const newEnrollment = await Enrollment.create(enrollmentData);
  res.status(201).json({
    success: true,
    data: newEnrollment,
  });
});
