const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Check and populate user.
exports.authUser = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    let token = req.cookies["token"];
    if (!token || token === "none") {
      return next();
    }

    // Token exists so validate token
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(decoded.id).then((user) => {
        req.user = user;
        return next();
      });
    } catch (err) {
      return next(new ErrorResponse("Invalid access token.", 401));
    }
  }
};

//protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  console.log('Protect meee')

  return next();
});

//Grant access to specifi roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
