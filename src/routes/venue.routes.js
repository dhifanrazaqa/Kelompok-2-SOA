const express = require("express");
const {
  getAllVenues,
  getVenueById,
  getEventByVenueCity,
  createVenue,
  updateVenue,
  deleteVenue,
} = require("../controllers/venue.controller");
const {
  createVenueValidation,
  updateVenueValidation,
  deleteVenueValidation,
} = require("../validations/venue.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Operations related to venue data
 */

/**
 * @swagger
 * /api/venue/{city}/events:
 *   get:
 *     summary: Get all events in a specific city by venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: City of the venue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events in the specified city
 *       404:
 *         description: City not found or no events
 */
router.get("/:city/events", getEventByVenueCity);

/**
 * @swagger
 * /api/venue:
 *   get:
 *     summary: Get all venues
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: A list of all venues
 */
router.get("/", authenticate, getAllVenues);

/**
 * @swagger
 * /api/venue/{id}:
 *   get:
 *     summary: Get venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the venue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue details
 *       404:
 *         description: Venue not found
 */
router.get("/:id", authenticate, getVenueById);

/**
 * @swagger
 * /api/venue:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the venue
 *                 example: "Central Park"
 *               city:
 *                 type: string
 *                 description: City where the venue is located
 *                 example: "New York"
 *               capacity:
 *                 type: integer
 *                 description: Maximum capacity of the venue
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Venue created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, createVenueValidation, validate, createVenue);

/**
 * @swagger
 * /api/venue/{id}:
 *   put:
 *     summary: Update venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the venue to update
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
 *                 description: Name of the venue
 *                 example: "Updated Central Park"
 *               city:
 *                 type: string
 *                 description: City where the venue is located
 *                 example: "New York"
 *               capacity:
 *                 type: integer
 *                 description: Maximum capacity of the venue
 *                 example: 6000
 *     responses:
 *       200:
 *         description: Venue updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Venue not found
 */
router.put("/:id", authenticate, updateVenueValidation, validate, updateVenue);

/**
 * @swagger
 * /api/venue/{id}:
 *   delete:
 *     summary: Delete venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the venue to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue deleted successfully
 *       404:
 *         description: Venue not found
 */
router.delete("/:id", authenticate, deleteVenueValidation, validate, deleteVenue);

module.exports = router;
