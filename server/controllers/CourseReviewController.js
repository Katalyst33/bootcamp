const CourseReview = require("../models/course-review");
const Course = require("../models/Course");
const advancedResults = require("../../api/middleware/advancedResults");

// const { protect, authorize } = require("../../api/middleware/auth");


/**
 * CourseReviewController
 * @class
 * @extends $.controller
 */
class CourseReviewController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    const protectedRoutes = ["addCourseReview", "updateCourseReview", "deleteCourseReview"];
    const populateQuery = [
      {
        path: "course",
        select: "title"
      },
      { path: "user", select: "name" }
    ];
    return {
      "protect": protectedRoutes,
      "roles.owner": protectedRoutes,
      "@getCourseReviews": [
        advancedResults(CourseReview, populateQuery)

      ],
      "@getAllReviews": advancedResults(CourseReview, populateQuery)

    };
  }

  static async getAllReviews({ res }) {

    return res.json(res.advancedResults);

  }

  static async getCourseReviews({ res, req }) {

    let populateQuery = [
      { path: "user", select: "name" },
      { path: "course", select: "title" }
    ];
    const reviewData = {
      course: req.params.courseId
    };

    const reviews = await CourseReview.find(reviewData).populate(populateQuery);
    return res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });


  }

  static async getOneCourseReview({ res, req }) {

    console.log("ONE COURSE REVIEW");
    let populateQuery = [
      { path: "user", select: "name" },
      { path: "course", select: "title" }
    ];
    const review = await CourseReview.findById(req.params.reviewId).populate(populateQuery);
    if (!review) {
      return res.json({
        error: `No review found oooo`
      });
    }
    res.json({
      success: true,
      data: review
    });
  }


  static async getUserCourseReviews({ req, res }) {
    let populateQuery = [
      { path: "user", select: "name" },
      { path: "course", select: "title" }
    ];

    const reviewData = {
      user: req.user.id
    };
    const reviews = await CourseReview.find(reviewData).populate(populateQuery);

    return res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });


  }

  static async addCourseReview({ req, res }) {
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
      return res.json({
        error: `Course not found`
      });
    }


    reviewData.bootcamp = course.bootcamp;
    try {
      const newReview = await CourseReview.create({

        ...reviewData,
        ...req.body
      });
      res.status(201).json({
        success: true,
        data: newReview
      });
    } catch (e) {
      res.json({
        error: e.message
      });
      console.log(e.errors);
      // console.log(e.errors.message);

    }


  }

  static async updateCourseReview({ req, res }) {
    let review = await CourseReview.findById(req.params.reviewId);
    if (!review) {
      return res.json({
        error: `No Review with the id of ${req.params.id}`
      });
    }

    //make sure review belongs to user, or user is an admin
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return ({
        error: `Not authorised to update review`
      });
    }
    review = await CourseReview.findByIdAndUpdate(req.params.reviewId, req.body, {
      new: true,
      runValidators: true
    });

    res.status(201).json({
      msg: "updated review successfully",
      success: true,
      data: review
    });
  }

  static async deleteCourseReview({ req, res }) {


    const review = await CourseReview.findById(req.params.reviewId);
    if (!review) {
      return res.json({
        error: `Review not Found`
      });
    }

    //make sure review belongs to user, or user is an admin
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return ({
        error: `you are Not authorised to Delete review`
      });
    }


    await review.remove();


    res.status(201).json({
      success: true,
      data: {}
    });
  }

  //end
}


module.exports = CourseReviewController;
