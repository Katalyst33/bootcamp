const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
//load env vars

dotenv.config({
  path: "./config/config.env",
});

//cnnetct to the database
connectDB();

//route files
const bootcamps = require("./routes/bootcamp");
const app = express();

//body parser
app.use(express.json());

//dev logging middle ware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(logger);
}

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,

  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow
  )
);
//handle unhanled promise rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  //Close server & exit Process
  server.close(() => process.exit(1));
});
