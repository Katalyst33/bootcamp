const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {},
  courses:[],
});

module.exports = mongoose.model("Cart", CartSchema);
