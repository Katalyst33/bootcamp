const Bootcamp = require("../../api/models/Bootcamp-model");
const advancedResults = require("../../api/middleware/advancedResults");
const { protect, authorize } = require("../../api/middleware/auth");
const User = require("../../api/models/User");

/**
 * UserController
 * @class
 * @extends $.controller
 */
class UserController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    return {

      "@getAllUsers": [

        advancedResults(User),
        protect,
        authorize("admin")
      ]
    };
  }

  static async getAllUsers({ res }) {
    return res.json(res.advancedResults);
  }

  static async getUser({ res, req }) {
    const user = await User.findById(req.params.userId);
    res.json({
      success: true,
      data:user
    });

  }

  static async updateUser({res,req}){
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      success: true,
      data: user,
    });
  }

  static async deleteUser({res, req}){
    await User.findByIdAndDelete(req.params.userId);
    res.json({
      success: true,
      data: {},
    });

  }


//end
}


module.exports = UserController;
