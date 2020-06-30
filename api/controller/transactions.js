const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Transaction = require("../models/transactions");
const Course = require("../models/Course");


//@desc Add Transactions
//@route POST /api/v1/transactions
//@access Private

exports.addTransaction = asyncHandler(async (req, res, next) => {


  const transaction = await Transaction.create(req.body);

  res.status(201).json({
    success: true,
    data: transaction
  });

});


//@desc Get a single Course
//@route GET /api/v1/courses/:id
//@access Public
exports.getTransactions = asyncHandler(async (req, res, next) => {


 res.status(200).json(res.advancedResults);
});



exports.getTransaction = asyncHandler(async (req,res, next) =>{
  const transaction = await  Transaction.findById(req.params.id)
  if(!transaction){
    return  next(
      new ErrorResponse(`Transaction not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success:true,
    data:transaction
  });
});

exports.deleteTransaction = asyncHandler(async (req, res, next) =>{
  const transaction = await Transaction.findById(req.params.id);
  if(!transaction){
    return next(
      new ErrorResponse(`Transactionnot found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure only admin can delete
  if(transaction.user.toString() !== req.user.id && req.user.role !== "admin"){
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete transaction`,
        401
      )
    );

  }

  transaction.remove();
  res.status(200).json({
    success: true,
    data: {},
  });

})
