const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp-model");
const Enrollment = require("../models/Enrollment");

//@desc Get All Course
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses
//@access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({
      bootcamp: req.params.bootcampId
    }).lean();
    for (const course of courses) {
      course.enrolled =
        (await Enrollment.count({
          course: course._id,
          user: req.user.id
        })) > 0;
    }
    console.log(req.user);
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc Get a single Course
//@route GET /api/v1/courses/:id
//@access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  let populateQuery = [
    {
      path: "bootcamp",
      select: "name description"
    },
    { path: "user", select: "name" }
  ];
  const course = await Course.findById(req.params.id).populate(populateQuery).lean();
  course.enrolled =
    (await Enrollment.count({
      course: course._id,
      user: req.user.id
    })) > 0;
  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,

    data: course
  });
});

//@desc Add Course
//@route POST /api/v1/bootcamps/:bootcampId/courses
//@access Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;


  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }
  //MAke sure is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to bootcamp  ${bootcamp._id}`,
        401
      )
    );
  }
  const course = await Course.create(req.body);
  console.log(req.body);
  res.status(200).json({
    success: true,

    data: course
  });
});

//@desc Update Course
//@route PUT /api/v1/bootcamps/:bootcampId/courses
//@access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id}`),
      404
    );
  }
  //MAke sure is USer id course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course ${course._id}`,
        401
      )
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,

    data: course
  });
});

//@desc Delete Course
//@route DELETE /api/v1/bootcamps/:bootcampId/courses
//@access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id}`),
      404
    );
  }
  //Make sure is USer is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete course ${course._id}`,
        401
      )
    );
  }
  await course.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});
