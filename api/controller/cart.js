const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Cart = require("../models/Cart")


//@desc Get Cart Items
//@route GET /api/v1/carts/
//@access Public
exports.getCart = asyncHandler(async (req, res, next) =>{
  res.status(200).json(res.advancedResults);
});

//@desc add cart
//@route GET /api/v1/carts/
//@access Public

exports.addCart = asyncHandler(async (req, res, next) => {

  const newCart = await  Cart.create( req.body)

  res.status(201).json({
    success: true,
    data: newCart
  });

})

/*
*  "courses": [
            {
                "_id": "5f01177a7adaa090d01fae3a",
                "course": "5ef85cb9b7f6725193275041",
                "price": 3000,
                "title": "angular school"
            },
            {
                "_id": "5f01177a7adaa090d01fae3b",
                "course": "5ef66768e59b4f43a602d438",
                "price": 4000,
                "title": "react school"
            }
        ],
* */


//@desc update Cart
//@route PUT /api/v1/cart/:id
//@access Public

exports.updateCart = asyncHandler(async (req, res, next) =>{

  let cart =  await Cart.findById(req.params.id);
  if(!cart){
    return next(
      new ErrorResponse(`No Review with the id of ${req.params.id}`, 404)
    );
  }

  //make sure review belongs to user

  if(cart.user.toString() !== req.user.id ){
    return next(new ErrorResponse(`Not authorised to update review`, 401));

  }

  cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });


  res.status(201).json({
    success: true,
    data: cart
  });
});
