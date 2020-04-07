const ErrorResponse = require("../utils/errorResponse");

const errorhandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log to console for dev
  console.log(err.stack.red);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  console.log(error.name);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorhandler;
