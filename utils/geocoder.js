const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKEy: "process.env.GEOCODER_API_KEY",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

console.log("hahahahha" + process.env.GEOCODER_API_KEY);

module.exports = geocoder;
