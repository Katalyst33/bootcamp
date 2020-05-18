const dotenv = require("dotenv");

// const url = env.APP_PROTOCOL;

dotenv.config({
  path: "./config/config.env",
});
const env = process.env;

module.exports = {
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:5000/",
        ws: false,
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000",
        ws: false,
        changeOrigin: true,
      },
    },
  },
};

console.log(__dirname);
