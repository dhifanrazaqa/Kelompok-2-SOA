const express = require("express");
const {
  getAllOrderTickets,
  getOrderTicketByIdInvoice,
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
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getAllOrderTickets);
router.get("/:id/invoice", authenticate, getOrderTicketByIdInvoice);
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
  authorize(['ADMIN']),
  updateOrderTicketValidation,
  validate,
  updateOrderTicket
);
router.delete(
  "/:id",
  authenticate,
  authorize(['ADMIN']),
  deleteOrderTicketValidation,
  validate,
  deleteOrderTicket
);

module.exports = router;
