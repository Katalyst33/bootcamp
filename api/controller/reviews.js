const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp-model");
const Course = require("../models/Course");

//@desc Get Reviews
//@route GET /api/v1/reviews/
//@access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  let populateQuery = [
    { path: "user", select: "name" },
    { path: "course", select: "title" }];
  if (req.params.courseId) {
    const reviews = await Review.find({
      course: req.params.courseId
    }).populate(populateQuery);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc Single Review
//@route GET /api/v1/reviews/:id
//@access Public

exports.getReview = asyncHandler(async (req, res, next) => {
  let populateQuery = [
    { path: "bootcamp", select: "name description" },
    { path: "user", select: "name" }
  ];
  const review = await Review.findById(req.params.id).populate(populateQuery);
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

//@desc Add review
//@route post /api/v1/courses/:courseId/reviews/
//@access Private

exports.addReview = asyncHandler(async (req, res, next) => {
  const reviewData = {
    course: req.params.courseId,
    user: req.user.id,


  };

  const review = await Review.findOne(reviewData);

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
  const newReview = await Review.create({
    ...reviewData,
    ...req.body
  });
  res.status(201).json({
    success: true,
    data: newReview
  });

  /*
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `No bootcamp with the id of ${req.params.bootcampId}`,
          404
        )
      );
    }

    const review = await Review.create(req.body);
    res.status(201).json({
      success: true,
      data: review,
    });*/
});

//@desc Update review
//@route PUT /api/v1/reviews/:id
//@access Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }

  //make sure review belongs to user, or user is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorised to update review`, 401));
  }
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }

  //make sure review belongs to user, or user is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorised to Delete review`, 401));
  }

  await review.remove();

  res.status(201).json({
    success: true,
    data: {}
  });
});
