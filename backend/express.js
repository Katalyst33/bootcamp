const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const {authUser} = require("../api/middleware/auth");


module.exports = next => {
  $.app.use(cookieParser());

  //session
  $.app.use(
    session({
      secret: "some-key",
      // name: "_somecookie",
      resave: false,
      saveUninitialized: true,
      cookie: { domain: " http://192.168.0.160", secure: false }, // <- THIS, set domain as 'app.com'
    })
  );

  $.app.use("/api/*", authUser);


  return next()
}
