const express = require("express");
const {
  getAllOrderTickets,
  getOrderTicketById,
  createOrderTicket,
  updateOrderTicket,
  deleteOrderTicket,
} = require("../controllers/orderTicket.controller");
const {
  createOrderTicketValidation,
  updateOrderTicketValidation,
  deleteOrderTicketValidation,
} = require("../validations/orderTicket.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/// Simple API CRUD
router.get("/", authenticate, getAllOrderTickets);
router.get("/:id", authenticate, getOrderTicketById);
router.post(
  "/",
  authenticate,
  createOrderTicketValidation,
  validate,
  createOrderTicket
);
router.put(
  "/:id",
  authenticate,
  updateOrderTicketValidation,
  validate,
  updateOrderTicket
);
router.delete(
  "/:id",
  authenticate,
  deleteOrderTicketValidation,
  validate,
  deleteOrderTicket
);

module.exports = router;
