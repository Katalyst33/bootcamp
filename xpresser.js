//> 1
require("colors");
const xpresser = require("xpresser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config({
  path: "./config/config.env",
});


//> 2
const $ = xpresser({
  name: "Bootcamper",
  paths: {
    base: __dirname, public:"dist" ,
    backend:"base://server"
  },
  server: {
    port: 2000,
    servePublicFolder: true,
  }
});


//> 3
$.on.start(next => {
  connectDB();
  return next();
});


$.on.expressInit(next => {
  return require('./server/express')(next)
})
$.on.bootServer(next => {
  const errorHandler = require("./api/middleware/error");
  $.app.use(errorHandler)
  return next()
})
//> 4
$.boot();
