const ErrorResponse = require("../utils/errorResponse");

const errorhandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log to console for dev
  console.log(err);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  //MOngoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }
  console.log(error.name);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorhandler;
