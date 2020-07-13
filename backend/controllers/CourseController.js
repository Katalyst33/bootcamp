const Enrollment = require("../../api/models/Enrollment");
const advancedResults = require("../../api/middleware/advancedResults");
const Course = require("../../api/models/Course");
const { protect, authorize } = require("../../api/middleware/auth");



/**
 * CourseController
 * @class
 * @extends $.controller
 */
class CourseController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    return {

      "@getAllCourses": [
        /*     protect,
             authorize("admin"),*/
        advancedResults(Course, {
          path: "bootcamp",
          select: "name description"
        })
      ]
    };
  }

  static async getAllCourses({ res }) {
    return res.status(200).json(res.advancedResults);

  }

  static async getBootcampCourses({ req, res }) {

    if (req.params.bootcampId) {
      const courses = await Course.find({
        bootcamp: req.params.bootcampId
      }).lean();
      if (!req.user) {
        return res.status(200).json({
          success: true,
          count: courses.length,
          data: courses
        });
      } else {
        for (const course of courses) {
          course.enrolled =
            (await Enrollment.count({
              course: course._id,
              user: req.user.id
            })) > 0;
        }
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
  }

  static async getOneCourse({ req, res}) {

    let populateQuery = [
      {
        path: "bootcamp",
        select: "name description"
      },
      { path: "user", select: "name" }
    ];
    const course = await Course.findById(req.params.courseId).populate(populateQuery).lean();
    if (!course) {
      return res.json({error:"No Coursefound"})

    }else {
      course.enrolled =
        (await Enrollment.count({
          course: course._id,
          user: req.user.id
        })) > 0;


      res.status(200).json({
        success: true,
        data: course
      });
    }




  }


}


module.exports = CourseController;
