const express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserTickets,
  getUserOrganizer,
  getUserOrderTickets,
  getUserOrderEvents,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  updateUserValidation,
  deleteUserValidation,
} = require("../validations/user.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to user data
 */

/**
 * @swagger
 * /api/user/{id}/tickets:
 *   get:
 *     summary: Get all tickets ordered by a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tickets ordered by the user
 */
router.get("/:id/tickets", getUserTickets);

/**
 * @swagger
 * /api/user/{id}/organizer:
 *   get:
 *     summary: Get the organizer information of a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User organizer details
 */
router.get("/:id/organizer", getUserOrganizer);

/**
 * @swagger
 * /api/user/{id}/order/tickets:
 *   get:
 *     summary: Get all tickets ordered by the user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tickets ordered by the user
 */
router.get("/:id/order/tickets", getUserOrderTickets);

/**
 * @swagger
 * /api/user/{id}/order/events:
 *   get:
 *     summary: Get all events ordered by the user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events ordered by the user
 */
router.get("/:id/order/events", getUserOrderEvents);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users
 */
router.get("/", authenticate, getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:id", authenticate, getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
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
 *                 description: Name of the user
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put("/:id", authenticate, updateUserValidation, validate, updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", authenticate, deleteUserValidation, validate, deleteUser);

module.exports = router;
