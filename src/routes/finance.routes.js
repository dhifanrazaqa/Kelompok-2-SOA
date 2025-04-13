const express = require("express");
const {
  getAllFinances,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
} = require("../controllers/finance.controller");

const router = express.Router();

router.get("/", getAllFinances);
router.get("/:id", getFinanceById);
router.post("/", createFinance);
router.put("/:id", updateFinance);
router.delete("/:id", deleteFinance);

module.exports = router;
