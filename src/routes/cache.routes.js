const express = require("express");
const {
  registerUserCache,
  getUserByIdCache,
  deleteUserCache,
  createEvent,
  getEventByIdCache,
  getAllEventsCache,
  getEventChecklistCache,
  getEventDocumentCache,
  getEventPopularCache,
  getEventTicketsCache,
  deleteEventCache,
  getOrganizerByIdCache,
  getOrganizerTopEventCache,
} = require("../controllers/cache.controller");
const { registerValidation } = require("../validations/auth.validation");
const { createEventValidation } = require("../validations/event.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cache
 *   description: Cached user, event, and organizer routes
 */

/**
 * @swagger
 * /api/cache/user:
 *   post:
 *     summary: Register user (cached)
 *     tags: [Cache]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered and cached
 */
router.post("/user", registerValidation, validate, registerUserCache);

/**
 * @swagger
 * /api/cache/user/{id}:
 *   get:
 *     summary: Get user by ID (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cached user data
 */
router.get("/user/:id", getUserByIdCache);

/**
 * @swagger
 * /api/cache/user/{id}:
 *   delete:
 *     summary: Delete cached user by ID
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cached user deleted
 */
router.delete("/user/:id", deleteUserCache);

/**
 * @swagger
 * /api/cache/event:
 *   post:
 *     summary: Create event (cached)
 *     tags: [Cache]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created and cached
 */
router.post("/event", createEventValidation, validate, createEvent);

/**
 * @swagger
 * /api/cache/events:
 *   get:
 *     summary: Get all events (cached)
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: List of all cached events
 */
router.get("/events", getAllEventsCache);

/**
 * @swagger
 * /api/cache/event/{id}:
 *   get:
 *     summary: Get event by ID (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Cached event data
 */
router.get("/event/:id", getEventByIdCache);

/**
 * @swagger
 * /api/cache/event/{id}/checklist:
 *   get:
 *     summary: Get checklist for an event (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Cached event checklist
 */
router.get("/event/:id/checklist", getEventChecklistCache);

/**
 * @swagger
 * /api/cache/event/{id}/document:
 *   get:
 *     summary: Get documents for an event (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Cached event documents
 */
router.get("/event/:id/document", getEventDocumentCache);

/**
 * @swagger
 * /api/cache/event/popular:
 *   get:
 *     summary: Get popular events (cached)
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: List of popular cached events
 */
router.get("/event/popular", getEventPopularCache);

/**
 * @swagger
 * /api/cache/event/{id}/tickets:
 *   get:
 *     summary: Get tickets for an event (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Cached event tickets
 */
router.get("/event/:id/tickets", getEventTicketsCache);

/**
 * @swagger
 * /api/cache/event/{id}:
 *   delete:
 *     summary: Delete cached event by ID
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Cached event deleted
 */
router.delete("/event/:id", deleteEventCache);

/**
 * @swagger
 * /api/cache/organizer/{id}:
 *   get:
 *     summary: Get organizer by ID (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organizer ID
 *     responses:
 *       200:
 *         description: Cached organizer data
 */
router.get("/organizer/:id", getOrganizerByIdCache);

/**
 * @swagger
 * /api/cache/organizer/{id}/top-event:
 *   get:
 *     summary: Get top event of organizer (cached)
 *     tags: [Cache]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organizer ID
 *     responses:
 *       200:
 *         description: Top event of the organizer (cached)
 */
router.get("/organizer/:id/top-event", getOrganizerTopEventCache);

module.exports = router;
