const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  courses: [{
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("Transaction", TransactionSchema);
