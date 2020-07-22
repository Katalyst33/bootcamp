const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Cart = require("../models/Cart");


//@desc Get Cart Items
//@route GET /api/v1/carts/
//@access Public
exports.getCart = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.advancedResults);

});

//@desc add cart
//@route GET /api/v1/carts/
//@access Public

exports.getUserCart = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    res.status(200).json({
      success: true
    });
  } else {
    res.status(200).json({
      success: true,
      cart
    });
  }


});

//Stop undo herew

exports.addCart = asyncHandler(async (req, res) => {

  const cartData = {
    user: req.user.id
  };

  let cart = await Cart.findOne(cartData);

  if (!cart) {
    cart = await Cart.create({
      ...cartData,
      courses: req.body
    });
  } else {

    cart = await Cart.findOneAndUpdate(cartData,
      {
        ...{ courses: req.body },
        ...{ user: req.user.id }
      }, {
        new: true
      });
    // console.log("REQ BODY HERE",{ courses: req.body })
    res.status(201).json({
      success: true,
      data: cart
    });
  }


});


//@desc update Cart
//@route PUT /api/v1/cart/:id
//@access Public

exports.updateCart = asyncHandler(async (req, res, next) => {

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(
      new ErrorResponse(`No Review with the id of ${req.params.id}`, 404)
    );
  }

  //make sure review belongs to user

  if (cart.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorised to update review`, 401));

  }

  cart = await Cart.findByIdAndUpdate(req.params.id, { $push: { cart: req.body } }, {
    new: true,
    runValidators: true
  });


  res.status(201).json({
    success: true,
    data: cart
  });
});
