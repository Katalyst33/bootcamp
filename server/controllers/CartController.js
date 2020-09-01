const Cart = require("../models/Cart");
const Course = require("../models/Course");
const advancedResults = require("../../api/middleware/advancedResults");


/**
 * CartController
 * @class
 * @extends $.controller
 */
class CartController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    return {
      "@getCart": advancedResults(Cart)
    };
  }

  static async getCart({ res }) {

    return res.json(res.advancedResults);

  }


  static async getUserCart({ req, res }) {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      res.json({
        success: true
      });
    } else {
      res.json({
        success: true,
        cart
      });

    }

  }

  static async addCart({ req, res }) {

    const cartData = {
      user: req.user.id
    };

    let cart = await Cart.findOne(cartData);

    if (!cart) {
      cart = await Cart.create({
        ...cartData,
        courses: Object.values(req.body)
      });
    } else {
      await cart.remove();
      await Cart.create({
        ...cartData,
        courses: Object.values(req.body)
      });


      // console.log("REQ BODY HERE",req.body)
      res.status(201).json({
        success: true,
        data: cart
      });
    }

  }

  static async updateCart({ req, res }) {

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.json({
        error: `No Review with the id of ${req.params.id}`
      });

    }

    //make sure review belongs to user

    if (cart.user.toString() !== req.user.id) {
      return res.json({
        error: `Not authorised to update review`

      });

    }

    cart = await Cart.findByIdAndUpdate(req.params.id, { $push: { cart: req.body } }, {
      new: true,
      runValidators: true
    });


    res.status(201).json({
      success: true,
      data: cart
    });
  }

  //end
}


module.exports = CartController;
