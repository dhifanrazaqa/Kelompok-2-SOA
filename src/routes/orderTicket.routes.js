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

/**
 * @swagger
 * tags:
 *   name: Order Tickets
 *   description: Order management routes for tickets
 */

/**
 * @swagger
 * /api/order-ticket:
 *   get:
 *     summary: Get all order tickets
 *     tags: [Order Tickets]
 *     responses:
 *       200:
 *         description: A list of all order tickets
 */
router.get("/", authenticate, getAllOrderTickets);

/**
 * @swagger
 * /api/order-ticket/{id}:
 *   get:
 *     summary: Get order ticket by ID
 *     tags: [Order Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order ticket
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order ticket record
 *       404:
 *         description: Order ticket not found
 */
router.get("/:id", authenticate, getOrderTicketById);

/**
 * @swagger
 * /api/order-ticket:
 *   post:
 *     summary: Create a new order ticket
 *     tags: [Order Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: The event ID for the ticket order
 *                 example: "12345"
 *               userId:
 *                 type: string
 *                 description: The user ID for the ticket order
 *                 example: "67890"
 *               quantity:
 *                 type: integer
 *                 description: The number of tickets to be ordered
 *                 example: 3
 *     responses:
 *       201:
 *         description: Order ticket created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticate,
  createOrderTicketValidation,
  validate,
  createOrderTicket
);

/**
 * @swagger
 * /api/order-ticket/{id}:
 *   put:
 *     summary: Update an existing order ticket
 *     tags: [Order Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order ticket to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The updated number of tickets
 *                 example: 4
 *     responses:
 *       200:
 *         description: Order ticket updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order ticket not found
 */
router.put(
  "/:id",
  authenticate,
  updateOrderTicketValidation,
  validate,
  updateOrderTicket
);

/**
 * @swagger
 * /api/order-ticket/{id}:
 *   delete:
 *     summary: Delete an order ticket by ID
 *     tags: [Order Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order ticket to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order ticket deleted successfully
 *       404:
 *         description: Order ticket not found
 */
router.delete(
  "/:id",
  authenticate,
  deleteOrderTicketValidation,
  validate,
  deleteOrderTicket
);

module.exports = router;
