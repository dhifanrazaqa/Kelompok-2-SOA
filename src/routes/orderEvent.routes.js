const express = require("express");
const {
  getAllOrderEvents,
  getOrderEventById,
  createOrderEvent,
  updateOrderEvent,
  deleteOrderEvent,
} = require("../controllers/orderEvent.controller");
const {
  createOrderEventValidation,
  updateOrderEventValidation,
  deleteOrderEventValidation,
} = require("../validations/orderEvent.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order Events
 *   description: Order management routes for events
 */

/**
 * @swagger
 * /api/order-event:
 *   get:
 *     summary: Get all order events
 *     tags: [Order Events]
 *     responses:
 *       200:
 *         description: A list of all order events
 */
router.get("/", authenticate, getAllOrderEvents);

/**
 * @swagger
 * /api/order-event/{id}:
 *   get:
 *     summary: Get order event by ID
 *     tags: [Order Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order event record
 *       404:
 *         description: Order event not found
 */
router.get("/:id", authenticate, getOrderEventById);

/**
 * @swagger
 * /api/order-event:
 *   post:
 *     summary: Create a new order event
 *     tags: [Order Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: The event ID for the order
 *                 example: "12345"
 *               userId:
 *                 type: string
 *                 description: The user ID for the order
 *                 example: "67890"
 *               quantity:
 *                 type: integer
 *                 description: The number of tickets to be ordered
 *                 example: 2
 *     responses:
 *       201:
 *         description: Order event created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticate,
  createOrderEventValidation,
  validate,
  createOrderEvent
);

/**
 * @swagger
 * /api/order-event/{id}:
 *   put:
 *     summary: Update an existing order event
 *     tags: [Order Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order event to update
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
 *                 example: 3
 *     responses:
 *       200:
 *         description: Order event updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order event not found
 */
router.put(
  "/:id",
  authenticate,
  updateOrderEventValidation,
  validate,
  updateOrderEvent
);

/**
 * @swagger
 * /api/order-event/{id}:
 *   delete:
 *     summary: Delete an order event by ID
 *     tags: [Order Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order event deleted successfully
 *       404:
 *         description: Order event not found
 */
router.delete(
  "/:id",
  authenticate,
  deleteOrderEventValidation,
  validate,
  deleteOrderEvent
);

module.exports = router;
