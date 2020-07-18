const Enrollment = require("../../api/models/Enrollment");
const Course = require("../../api/models/Course");


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
    static middleware(){
        return {}
    }

    static async addEnrollment({req,res}){
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
        console.log("course display",course)
        if (!course) {
            return res.json({
                error:'No course found'
            })

        }
        enrollmentData.bootcamp = course.bootcamp;

        console.log("bootcamp id", course.bootcamp);
        console.log(req.body);
        const newEnrollment = await Enrollment.create(enrollmentData);
        res.status(201).json({
            success: true,
            data: newEnrollment,
        });
    }

    //end
}


module.exports = EnrollmentController;
