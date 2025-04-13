const express = require("express");
const {
  getAllTickets,
  getTicketById,
  getTicketBuyers,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket.controller");
const {
  createTicketValidation,
  updateTicketValidation,
  deleteTicketValidation,
} = require("../validations/ticket.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Complex API
router.get("/:id/buyers", getTicketBuyers);

// Simple API CRUD
router.get("/", authenticate, getAllTickets);
router.get("/:id", authenticate, getTicketById);
router.post("/", authenticate, createTicketValidation, validate, createTicket);
router.put("/:id", authenticate, updateTicketValidation, validate, updateTicket);
router.delete(
  "/:id",
  authenticate,
  deleteTicketValidation,
  validate,
  deleteTicket
);

module.exports = router;
