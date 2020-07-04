const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const CourseReview = require("../models/course-review");


//@desc Add review
//@route post /api/v1/courses/:courseId/course-reviews/
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



//@desc Get Reviews
//@route GET /api/v1/course-reviews/
//@access Public
exports.getCourseReviews = asyncHandler(async (req, res, next) => {
  let populateQuery = [
    { path: "user", select: "name" },
    { path: "course", select: "title" }
    ];
  const reviewData = {
    course: req.params.courseId,
    // user: req.user.id
  };

  if (req.params.courseId) {
    const reviews = await CourseReview.find(reviewData).populate(populateQuery);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }

});
//@desc Get User Course Reviews
//@route GET /api/v1/course-reviews/userId
//@access Public
exports.getUserCourseReviews = asyncHandler(async (req, res, next) => {
  let populateQuery = [
    { path: "user", select: "name" },
    { path: "course", select: "title" }
  ];
  const reviewData = {
    user: req.user.id
  };

    const reviews = await CourseReview.find(reviewData).populate(populateQuery);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });

});



//@desc Single Course Review
//@route GET /api/v1/course-review/:id
//@access Public

exports.getCourseReview = asyncHandler(async (req, res, next) => {
  let populateQuery = [
    { path: "user", select: "name" },
    { path: "course", select: "title" }
  ];
  const review = await CourseReview.findById(req.params.id).populate(populateQuery);
  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: review
  });
});


//@desc Update review
//@route PUT /api/v1/course-reviews/:id
//@access Private

exports.updateCourseReview = asyncHandler(async (req, res, next) => {
  let review = await CourseReview.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No Review with the id of ${req.params.id}`, 404)
    );
  }

  //make sure review belongs to user, or user is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorised to update review`, 401));
  }
  review = await CourseReview.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    data: review
  });
});

//@desc Delete review
//@route Delete /api/v1/reviews/:id
//@access Private

exports.deleteCourseReview = asyncHandler(async (req, res, next) => {
  const review = await CourseReview.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No Review with the id of ${req.params.id}`, 404)
    );
  }

  //make sure review belongs to user, or user is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorised to Delete review`, 401));
  }

  await CourseReview.remove();

  res.status(201).json({
    success: true,
    data: {}
  });
});


// //
// gvhb

/*
1) During our OCnversation, you mentioned laravel Nova admin dashbaord.
but its not mentioned in this over view.
2) Scheduling with a mobile application (In Progress)
You specifically stated that, you only needed  laravel support for the project.
*/
