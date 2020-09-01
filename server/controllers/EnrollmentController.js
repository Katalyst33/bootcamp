const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const advancedResults = require("../../api/middleware/advancedResults");


/**
 * EnrollmentController
 * @class
 * @extends $.controller
 */
class EnrollmentController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    const populateQuery = [
      {
        path: "course",
        select: "title"
      },
      { path: "user", select: "name" }
    ];
    return {
      "@getAllEnrollments": advancedResults(Enrollment, populateQuery),
      "@getUserEnrollments": advancedResults(Enrollment, populateQuery)
    };
  }

  static async getAllEnrollments({ res }) {

    return res.json(res.advancedResults);
  }

  static async addEnrollment({ req, res }) {
    const enrollmentData = {
      course: req.params.courseId,
      user: req.user.id
    };
    const enrollment = await Enrollment.findOne(enrollmentData);

    if (enrollment) {
      return res.json({
        msg: "you have enrolled for this course"
      });
    }

    const course = await Course.findById(enrollmentData.course);
    console.log("course display", course);
    if (!course) {
      return res.json({
        error: "No course found"
      });

    }
    enrollmentData.bootcamp = course.bootcamp;

    console.log("bootcamp id", course.bootcamp);
    console.log(req.body);
    const newEnrollment = await Enrollment.create(enrollmentData);
    res.status(201).json({
      success: true,
      data: newEnrollment
    });
  }

  static async getUserEnrollments({ req, res }) {
    let populateQuery = [
      { path: "course", select: "title" },
      {path: "bootcamp", select: "name"}
    ];
    const enrollmentData = {
      user: req.user.id
    };
    const enrollments = await Enrollment.find(enrollmentData).populate(populateQuery).lean();

    if (!req.user.id) {
      return res.json({ error: "No User found" });
    } else {


      res.json({
        data: enrollments
      });
    }




    //end

  }


  static async removeEnrollment({req, res}){
    const enrollmentData = {
      course: req.params.courseId,
      user: req.user.id
    };

    const enrollment = await Enrollment.findOne(enrollmentData);

if(!enrollment){
  return res.json({
    error:`Not enrolled`
  });
}
//make sure user is owner of enrollment
    if(enrollmentData.user !== req.user.id && req.user.role !== "admin"){
      return res.json({
        error: `you are not authorized to delete enrollment `
      });
    }

    await  enrollment.remove();
    res.json({
      success: true,
      data: {}
    })

  }


  //end
}


module.exports = EnrollmentController;
