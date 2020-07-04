const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  courses:[{
    course:{
      type:mongoose.Schema.ObjectId,
      ref:"User"
    },
    title:{
      type:String,
      required: true,
    },
    price:{
      type:Number,
      required: true,
    },

  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
