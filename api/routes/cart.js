const express = require("express");

const {
  addCart,
  updateCart,


} = require("../controller/cart");


const Cart = require("../models/Cart");

const router = express.Router();


const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(addCart)

router
  .route("/:id")
  .put(protect, authorize("user"), updateCart)


module.exports = router;
