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

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Operations related to event tickets
 */

/**
 * @swagger
 * /api/ticket/{id}/buyers:
 *   get:
 *     summary: Get all buyers for a specific ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of buyers for the ticket
 */
router.get("/:id/buyers", getTicketBuyers);

/**
 * @swagger
 * /api/ticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: A list of all tickets
 */
router.get("/", authenticate, getAllTickets);

/**
 * @swagger
 * /api/ticket/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket details
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", authenticate, getTicketById);

/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the ticket
 *                 example: "VIP Ticket"
 *               price:
 *                 type: number
 *                 description: Price of the ticket
 *                 example: 150.00
 *               eventId:
 *                 type: string
 *                 description: The ID of the event for which the ticket is created
 *                 example: "event123"
 *               quota:
 *                 type: integer
 *                 description: The total number of tickets available
 *                 example: 100
 *               sold:
 *                 type: integer
 *                 description: The number of tickets already sold
 *                 example: 10
 *               description:
 *                 type: string
 *                 description: A description of the ticket
 *                 example: "Exclusive access to VIP areas."
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, createTicketValidation, validate, createTicket);

/**
 * @swagger
 * /api/ticket/{id}:
 *   put:
 *     summary: Update a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the ticket
 *                 example: "VIP Ticket Updated"
 *               price:
 *                 type: number
 *                 description: Updated price of the ticket
 *                 example: 175.00
 *               quota:
 *                 type: integer
 *                 description: Updated total number of tickets available
 *                 example: 120
 *               sold:
 *                 type: integer
 *                 description: Updated number of tickets already sold
 *                 example: 50
 *               description:
 *                 type: string
 *                 description: Updated description of the ticket
 *                 example: "Updated access to VIP areas with new benefits."
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ticket not found
 */
router.put("/:id", authenticate, updateTicketValidation, validate, updateTicket);

/**
 * @swagger
 * /api/ticket/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
router.delete("/:id", authenticate, deleteTicketValidation, validate, deleteTicket);

module.exports = router;
