const express = require("express");

const {
  addCart,
  updateCart,
  getUserCart


} = require("../controller/cart");


const Cart = require("../models/Cart");

const router = express.Router();


const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(addCart)
  .get(protect, authorize("user"), getUserCart)

router
  .route("/:id")
  .put(protect, authorize("user"), updateCart)


module.exports = router;
