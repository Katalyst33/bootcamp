const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const CourseReview = require("../models/course-review");


//@desc Add review
//@route post /api/v1/courses/:courseId/reviews/
//@access Private

exports.addCourseReview = asyncHandler(async (req, res, next) => {
  const reviewData = {
    course: req.params.courseId,
    user: req.user.id
  };

  const review = await CourseReview.findOne(reviewData);

  if (review) {
    return res.json({
      msg: "you have reviewed this course already"
    });

  }

  const course = await Course.findById(reviewData.course);
  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.courseId}`, 404)
    );
  }

  reviewData.bootcamp = course.bootcamp;

  /*  console.log("bootcamp id", course.bootcamp);
    console.log("All data", reviewData);
    console.log("body content", req.body);*/

  //spread(...) operator to add multiple new object
  const newReview = await CourseReview.create({
    ...reviewData,
    ...req.body
  });
  res.status(201).json({
    success: true,
    data: newReview
  });

});

