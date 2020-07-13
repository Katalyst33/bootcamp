const Bootcamp = require("../../api/models/Bootcamp-model");
const advancedResults = require("../../api/middleware/advancedResults");

/**
 * BootcampController
 * @class
 * @extends $.controller
 */
class BootcampController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    return {
      "@getAllBootcamps": advancedResults(Bootcamp)

    };
  }

  /**
   * boot method
   * @param {Xpresser.Http} http
   */
  static async boot({ req, res }) {
    const boot = {};
    if (req.params.bootcampId) {
      const bootcamp = await Bootcamp.findById(req.params.bootcampId);
      if (!bootcamp) {
        return res.json({ error: "No bootcamp found" });
      }
      boot.bootcamp = bootcamp;
    }
    return boot;
  }

  static getAllBootcamps({ res }) {

    return res.status(200).json(res.advancedResults);

  }


  static async getOneBootcamp({ res }, { bootcamp }) {
    // const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  }


  static async createBootcamp({ req, res }) {
    //Add user to req.body
    req.body.user = req.user.id;

    //Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

    //if the  user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== "admin") {
      return res.json({
        error: "This user has already published a bootcamp"
      });
    }
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      bootcamp
    });
  }

  static async deleteBootcamp({ req, res }, { bootcamp }) {


    //MAke sure is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {

      return res.json({
        error: `This user is not authorized to delete this bootcamp`
      });

    }

    bootcamp.remove();
    res.status(200).json({
      success: true,
      data: {}
    });


  }

  static async updateBootcamp({req, res},{bootcamp}){


  }

}


module.exports = BootcampController;
