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
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/:id/buyers", getTicketBuyers);
router.get("/", authenticate, getAllTickets);
router.get("/:id", authenticate, getTicketById);
router.post("/", authenticate, authorize(['ADMIN', 'ORGANIZER']), createTicketValidation, validate, createTicket);
router.put("/:id", authenticate, authorize(['ADMIN', 'ORGANIZER']), updateTicketValidation, validate, updateTicket);
router.delete("/:id", authenticate, authorize(['ADMIN', 'ORGANIZER']), deleteTicketValidation, validate, deleteTicket);

module.exports = router;
