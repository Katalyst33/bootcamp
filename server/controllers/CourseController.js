const Enrollment = require("../../api/models/Enrollment");
const advancedResults = require("../../api/middleware/advancedResults");
const Course = require("../../api/models/Course");
const Bootcamp = require("../../api/models/Bootcamp-model");
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
    const protectedRoutes = ["addCourse", "updateCourse", "deleteCourse"];
    return {
      "protect": protectedRoutes,
      "roles.editor": protectedRoutes,
      "@getAllCourses": [
        advancedResults(Course, {
          path: "bootcamp",
          select: "name description"
        })
      ]

    };
  }

  static async getAllCourses({ res }) {
    return res.json(res.advancedResults);

  }

  static async getCourses({ req, res }) {

    if (req.params.bootcampId) {
      const courses = await Course.find({
        bootcamp: req.params.bootcampId
      }).lean();
      if (!req.user) {
        return res.json({
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

      return res.json({
        success: true,
        count: courses.length,
        data: courses
      });
    } else {
      res.json(res.advancedResults);
    }
  }

  static async getOneCourse({ req, res }) {

    let populateQuery = [
      {
        path: "bootcamp",
        select: "name description"
      },
      { path: "user", select: "name" }
    ];
    const course = await Course.findById(req.params.courseId).populate(populateQuery).lean();


    if (!course) {
      return res.json({ error: "No Course found" });

    } else if (req.user) {
      console.log("USER HERE");
      course.enrolled =
        (await Enrollment.countDocuments({
          course: course._id,
          user: req.user.id
        })) > 0;
    }
    res.json({
      success: true,
      data: course
    });

  }

  static async addCourse({ req, res }) {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
      return res.json({
        error: `No Bootcamp was found`
      });

    }
    //MAke sure is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.json({
        error: ` You are not authorized to add a course to bootcamp `
      });

    }
    const course = await Course.create(req.body);
    res.json({
      success: true,
      data: course
    });

  }

  static async updateCourse({ req, res }) {
    let course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.json({
        error: `No Course found`
      });

    }
    //MAke sure is USer id course owner
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.json({
        error: `Your are not authorized to update course`
      });


    }
    course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
      runValidators: true
    });
    console.log("COURSE DATA", course);
    res.status(200).json({
      success: true,

      data: course
    });

  }

  static async deleteCourse({ req, res }) {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.json({
        error: ` No Course found `
      });

    }
    //Make sure is USer is course owner
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.json({
        error: `you are not authorized to delete course `
      });
    }

    await course.remove();
    res.status(200).json({
      success: true,
      data: {}
    });
  }


}


module.exports = CourseController;
