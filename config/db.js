const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

/*
mongoose.connect(  "mongodb://127.0.0.1/newagebot",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
    console.log("Connected to Mongo Database Successfully");
}).catch((err) => {
    console.log("Failed to Connect to MongoDb ", err);
});
*/
