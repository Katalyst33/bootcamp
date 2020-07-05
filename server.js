const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitizer = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const session = require("cookie-session");
const errorHandler = require("./api/middleware/error");
// const logger = require("./middleware/logger");
const connectDB = require("./config/db");
//load env vars

dotenv.config({
  path: "./config/config.env",
});

//connect to the database
connectDB();

//route files
const bootcamps = require("./api/routes/bootcamp");
const courses = require("./api/routes/course");
const auth = require("./api/routes/auth");
const users = require("./api/routes/users");
const reviews = require("./api/routes/reviews");
const courseReviews = require("./api/routes/course-review");
const enrollments = require("./api/routes/enrollments");
const transactions = require("./api/routes/transactions")
const cart = require("./api/routes/cart")

const app = express();

//body parser
app.use(express.json());
app.use(cookieParser());

//dev logging middle ware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  // app.use(logger);
}
//File uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitizer());

//prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 200,
});

app.use(limiter);
//set security header
app.use(helmet());

//prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//session
app.use(
  session({
    secret: "some-key",
    // name: "_somecookie",
    resave: false,
    saveUninitialized: true,
    cookie: { domain: " http://192.168.0.160", secure: false }, // <- THIS, set domain as 'app.com'
  })
);

//Mount routers
const { authUser } = require("./api/middleware/auth");
app.use("/api/*", authUser);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/course-reviews",courseReviews);
app.use("/api/v1/enrollments", enrollments);
app.use("/api/v1/transactions", transactions)
app.use("/api/v1/cart", cart)


//Set static folder
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "/dist/")));
app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname + "/dist/"));
//handle SPA
app.get("*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.use(errorHandler);

const PORT = 5000;

const server = app.listen(
  PORT,

  console.log(
    `Server running on ${process.env.NODE_ENV} mode on  http://127.0.0.1:${PORT}`
      .rainbow
  )
);
//handle unhandled promise rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  //Close server & exit Process
  server.close(() => process.exit(1));
});
