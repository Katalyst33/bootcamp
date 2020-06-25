const envLoader = require("@xpresser/env");
const env = envLoader("./config.env", {
  castBoolean: true,
  // required: ["ApiKey",""],
});

console.log(env);

module.exports = env;
