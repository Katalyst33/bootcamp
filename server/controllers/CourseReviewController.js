const CourseReview = require("../../api/models/course-review");
const Course = require("../../api/models/Course");
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
    return {
      "@getCourseReviews": [
        advancedResults(CourseReview,
          [{
            path: "course",
            select: "title"
          },
            { path: "user", select: "name" }
          ]
        )
      ],

      "@getAllReviews":advancedResults(CourseReview, [
        {
          path: "course",
          select: "title",
        },
        { path: "user", select: "name" }
      ]),

    };
  }

  static async getAllReviews({ res }) {

    return res.json(res.advancedResults);

  }

  static async getCourseReviews({ res, req }) {

    console.log("COURSE_REVIEW");
    let populateQuery = [
      { path: "user", select: "name" },
      { path: "course", select: "title" }
    ];
    const reviewData = {
      course: req.params.courseId,
      // user: req.user.id
    };

    const reviews = await CourseReview.find(reviewData).populate(populateQuery);

    return res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });


  }
  static async getOneCourseReview({res, req}){

    console.log("ONE COURSE REVIEW");
    let populateQuery = [
      { path: "user", select: "name" },
      { path: "course", select: "title" }
    ];
    const review = await CourseReview.findById(req.params.reviewId).populate(populateQuery);
    if (!review) {
     return res.json({
       error:`No review found oooo`
     })
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
    const newReview = await CourseReview.create({
      ...reviewData,
      ...req.body
    });
    res.status(201).json({
      success: true,
      data: newReview
    });

  }

  static async deleteCourseReview({req,res}){


    const review = await CourseReview.findById(req.params.reviewId);
    if (!review) {
     return res.json({
       error:`Review not Found`
     })
    }

    //make sure review belongs to user, or user is an admin
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return ({
        error:`you are Not authorised to Delete review`
      })
    }


    await CourseReview.remove();


    res.status(201).json({
      success: true,
      data: {}
    });
  }

  //end
}


module.exports = CourseReviewController;
