const ErrorResponse = require("../../api/utils/errorResponse");
const User = require("../../api/models/User");
const sendEmail = require("../../api/utils/sendEmail");


//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create Token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    msg:"Login succesfull",
    token
  });
  // console.log(token);
};


/**
 * AuthController
 * @class
 * @extends $.controller
 */
class AuthController extends $.controller {

  /**
   * middleware - Set Middleware
   * @returns {Object}
   */
  static middleware() {
    return {
      // '@me': authUser
    };
  }

  static async login({ req, res, next }) {
    const { email, password } = req.body;
    //Validate email and password
    if (!email || !password) {
      return next(new ErrorResponse("Please provide an email and password", 400));
    }

    //check for User
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({
        error:"Invalid credentials"
      })
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    sendTokenResponse(user, 200, res);

  }

  static async me({ req, res }) {
    const user = req.user ? await User.findById(req.user.id) : null;
    res.status(200).json({
      success: true,
      data: user
    });
  }


  static logout({ req, res }) {

    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    delete req.cookies["token"];

    res.status(200).json({
      success: true,
      data: {}
    });
  }

  static async register({ req, res }) {
    const { name, email, password, role } = req.body;
    //Creat user
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    sendTokenResponse(user, 200, res);
  }

  static async updateDetails({ req, res }) {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      data: user
    });

  }

  static async updatePassword({ req, res, next }) {
    const user = await User.findById(req.user.id).select("+password");

    //Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse("Password is incorrect", 401));
    }
    user.password = req.body.newPassword;
    await user.save();

    user.password = req.body.new;

    res.status(200).json({
      success: true,
      data: user
    });
  }

  static async forgotPassword({ req, res, next }) {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse("There is no user with that email", 404));
    }

    //GEt Reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //Create reset urk
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken} `;

    const message = `<p>
  you are receiving this email because you (or someone else ) has requested the reset of a 
  password. Please make a PUT request to:  
  <a href="\`${resetUrl}\`">Reset Password</a>
  \n\n ${resetUrl}</p>
  `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password reset token",
        message,
        html: message
      });
      res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({
        validateBeforeSave: false
      });
      return next(new ErrorResponse("Email could not be sent", 500));
    }
    res.status(200).json({
      success: true,
      data: user
    });
  }
}


module.exports = AuthController;
