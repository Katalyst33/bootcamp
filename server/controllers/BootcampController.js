const path = require("path");
const Bootcamp = require("../models/Bootcamp-model");
const advancedResults = require("../../api/middleware/advancedResults");
const { protect, authorize } = require("../../api/middleware/auth");

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
    const protectedRoutes = ["uploadBootcampPhoto","createBootcamp","updateBootcamp","deleteBootcamp"]
    return {
      "protect":protectedRoutes,
      "roles.editor":protectedRoutes,
      "@getAllBootcamps": advancedResults(Bootcamp),
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

    return res.json(res.advancedResults);

  }

  static async getOneBootcamp({ res }, { bootcamp }) {
    // const bootcamp = await Bootcamp.findById(req.params.bootcampId);


    res.json({
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

  static async updateBootcamp({ req, res }, { bootcamp }) {
    if (!bootcamp) {
      return res.json({
        error: `Bootcamp was not found`
      });
    }
    //Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.json({
        error: `You are not authorized to update this bootcamp`
      });

    }

    bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: bootcamp
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
    res.json({
      success: true,
      data: {}
    });


  }

  static async uploadBootcampPhoto({ req, res }, { bootcamp }) {
    //MAke sure is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.json({
        error: `Your are  not authorized to access this route`
      });

    }

    if (!req.files) {

      return res.json({
        error: `please upload a file`
      });


    }
    console.log("REQ_FILE", req.files.file);

    const file = req.files.file;
    if (!file.mimetype.startsWith("image")) {
      return res.json({
        error: `Please upload an image file`
      });
    }

    //Check file size
    if (file.size > process.env.MAX_FILE_UPLAOD) {

      return res.json({
        error: `Please upload an image less than
    ${process.env.MAX_FILE_UPLAOD}`
      });
    }


    //Check file size
    if (file.size > process.env.MAX_FILE_UPLAOD) {
      return res.json({
        error: `Please upload an image less than
    ${process.env.MAX_FILE_UPLAOD}`
      });

    }
    //create custom file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLAOD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);

        return res.json({
          error: `Problem with file upload`
        });

      }

      await Bootcamp.findByIdAndUpdate(bootcamp._id, { photo: file.name });

      res.json({
        success: true,
        data: file.name
      });
    });
    console.log(file.name);


  }

}


module.exports = BootcampController;
