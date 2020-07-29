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
        target: "http://localhost:2000/",
        ws: false,
        changeOrigin: true,
        secure:false
      },
      "/uploads": {
        target: "http://localhost:2000",
        ws: false,
        changeOrigin: true,
      },
    },
  },
};


