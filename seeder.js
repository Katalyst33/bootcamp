const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

const Bootcamp = require("./models/Bootcamp-model");
const Course = require("./models/Course");

//Connnect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
//inmport into database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data imported ...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Data Destroyed ...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
