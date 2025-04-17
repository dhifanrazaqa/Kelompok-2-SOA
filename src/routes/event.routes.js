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
 *             required:
 *               - title
 *               - type
 *               - target
 *               - budgetRange
 *               - organizerId
 *               - description
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the event
 *                 example: JavaScript Conference 2025
 *               type:
 *                 type: string
 *                 enum: [KONSER, PARTY, SEMINAR, LAINNYA]
 *                 description: The type of the event
 *                 example: SEMINAR
 *               target:
 *                 type: string
 *                 enum: [PRIVATE, PUBLIC]
 *                 description: The target audience of the event
 *                 example: PUBLIC
 *               budgetRange:
 *                 type: string
 *                 enum: [FIVE_TO_TEN, TEN_TO_TWENTY, TWENTY_TO_THIRTYFIVE, TENTATIVE]
 *                 description: Budget range for the event
 *                 example: TEN_TO_TWENTY
 *               organizerId:
 *                 type: string
 *                 description: ID of the organizer
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               thumbnail:
 *                 type: string
 *                 description: URL of the event thumbnail (optional)
 *                 example: https://example.com/images/event-thumb.jpg
 *               description:
 *                 type: string
 *                 description: Description of the event
 *                 example: A full-day seminar on modern web development.
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date and time of the event (ISO8601)
 *                 example: 2025-10-01T09:00:00Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date and time of the event (ISO8601)
 *                 example: 2025-10-01T17:00:00Z
 *               picName:
 *                 type: string
 *                 description: Person in charge's name (optional)
 *                 example: Jane Doe
 *               picPhone:
 *                 type: string
 *                 description: Person in charge's phone number (optional)
 *                 example: +628123456789
 *               picEmail:
 *                 type: string
 *                 format: email
 *                 description: Person in charge's email (optional)
 *                 example: jane.doe@example.com
 *               status:
 *                 type: string
 *                 enum: [CONCEPTING, PRODUCTION, TICKETING, ONGOING]
 *                 description: Status of the event (optional)
 *                 example: CONCEPTING
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
 *               title:
 *                 type: string
 *                 description: The updated title of the event
 *                 example: Updated JavaScript Conference
 *               type:
 *                 type: string
 *                 enum: [KONSER, PARTY, SEMINAR, LAINNYA]
 *                 description: The updated type of the event
 *                 example: PARTY
 *               target:
 *                 type: string
 *                 enum: [PRIVATE, PUBLIC]
 *                 description: The updated target audience
 *                 example: PRIVATE
 *               budgetRange:
 *                 type: string
 *                 enum: [FIVE_TO_TEN, TEN_TO_TWENTY, TWENTY_TO_THIRTYFIVE, TENTATIVE]
 *                 description: Updated budget range
 *                 example: TENTATIVE
 *               thumbnail:
 *                 type: string
 *                 description: URL to the updated thumbnail image
 *                 example: https://example.com/images/updated-thumb.jpg
 *               description:
 *                 type: string
 *                 description: Updated event description
 *                 example: An exciting networking party for developers.
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated start date (ISO8601 format)
 *                 example: 2025-12-10T09:00:00Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated end date (ISO8601 format)
 *                 example: 2025-12-10T17:00:00Z
 *               picName:
 *                 type: string
 *                 description: Updated PIC name
 *                 example: John Smith
 *               picPhone:
 *                 type: string
 *                 description: Updated PIC phone number
 *                 example: +628123456000
 *               picEmail:
 *                 type: string
 *                 format: email
 *                 description: Updated PIC email address
 *                 example: john.smith@example.com
 *               status:
 *                 type: string
 *                 enum: [CONCEPTING, PRODUCTION, TICKETING, ONGOING]
 *                 description: Updated status of the event
 *                 example: TICKETING
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
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteEventValidation, validate, deleteEvent);

module.exports = router;
