const express = require("express");


const {
  getTransactions,
  getTransaction,
  addTransaction,
  deleteTransaction

} = require("../controller/transactions");


const router = express.Router();
const Transaction = require("../../server/models/transactions");

const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Transaction), getTransactions)
  .post(protect, authorize("admin"), addTransaction);

router.route("/:id")
  .get(getTransaction)
  .delete(protect, authorize("admin"), deleteTransaction);

module.exports = router;
