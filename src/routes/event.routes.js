const express = require("express");
const {
  getAllEvents,
  getEventById,
  getEventTickets,
  getEventChecklist,
  getEventDocuments,
  getEventParticipants,
  getMostPopularEvents,
  getUpcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createEventValidation,
  updateEventValidation,
  deleteEventValidation,
} = require("../validations/event.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management routes
 */

/**
 * @swagger
 * /api/events/{id}/tickets:
 *   get:
 *     summary: Get tickets for an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event tickets
 *       404:
 *         description: Event not found
 */
router.get("/:id/tickets", getEventTickets);

/**
 * @swagger
 * /api/events/{id}/checklists:
 *   get:
 *     summary: Get checklists for an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event checklists
 *       404:
 *         description: Event not found
 */
router.get("/:id/checklists", getEventChecklist);

/**
 * @swagger
 * /api/events/{id}/documents:
 *   get:
 *     summary: Get documents for an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event documents
 *       404:
 *         description: Event not found
 */
router.get("/:id/documents", getEventDocuments);

/**
 * @swagger
 * /api/events/{id}/participants:
 *   get:
 *     summary: Get participants for an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event participants
 *       404:
 *         description: Event not found
 */
router.get("/:id/participants", getEventParticipants);

/**
 * @swagger
 * /api/events/popular:
 *   get:
 *     summary: Get most popular events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of most popular events
 */
router.get("/popular", getMostPopularEvents);

/**
 * @swagger
 * /api/events/upcoming:
 *   get:
 *     summary: Get upcoming events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of upcoming events
 */
router.get("/upcoming", getUpcomingEvents);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The event details
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event
 *                 example: Annual Conference
 *               description:
 *                 type: string
 *                 description: The description of the event
 *                 example: A conference to discuss the latest trends in technology
 *               date:
 *                 type: string
 *                 description: The date of the event
 *                 example: 2025-10-01
 *               location:
 *                 type: string
 *                 description: The location of the event
 *                 example: New York City, NY
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", authenticate, createEventValidation, validate, createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to update
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
 *                 description: The updated name of the event
 *                 example: Updated Annual Conference
 *               description:
 *                 type: string
 *                 description: The updated description of the event
 *                 example: An updated description for the annual technology conference
 *               date:
 *                 type: string
 *                 description: The updated date of the event
 *                 example: 2025-11-01
 *               location:
 *                 type: string
 *                 description: The updated location of the event
 *                 example: San Francisco, CA
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 */
router.put("/:id", authenticate, updateEventValidation, validate, updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", authenticate, deleteEventValidation, validate, deleteEvent);

module.exports = router;
