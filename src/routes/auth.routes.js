const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

/// Simple API CRUD
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 description: User's password (must be at least 6 characters and contain a number)
 *                 example: password123
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 description: User's phone number (optional)
 *                 example: +1234567890
 *               address:
 *                 type: string
 *                 description: User's address
 *                 example: 123 Main St, Springfield
 *               role:
 *                 type: string
 *                 description: User's role (must be PARTICIPANT, ORGANIZER, or ADMIN)
 *                 example: PARTICIPANT
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerValidation, validate, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidation, validate, login);

module.exports = router;
