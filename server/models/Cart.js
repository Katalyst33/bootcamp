const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {},
  courses:{
    type:Array,
    default:[]
  },
});

module.exports = mongoose.model("Cart", CartSchema);
