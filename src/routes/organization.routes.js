const express = require("express");
const {
  getAllOrganizations,
  getOrganizationById,
  getOrganizerEvents,
  getOrganizerDashboard,
  getOrganizerEventSummary,
  getOrganizerVenues,
  getOrganizerTopEvent,
  getOrganizerTickets,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organization.controller");
const {
  createOrganizerValidation,
  updateOrganizerValidation,
  deleteOrganizerValidation,
} = require("../validations/organization.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Operations related to organizations and their events
 */

/**
 * @swagger
 * /api/organizer/{id}/events:
 *   get:
 *     summary: Get events managed by a specific organizer
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events for the organizer
 */
router.get("/:id/events", getOrganizerEvents);

/**
 * @swagger
 * /api/organizer/{id}/dashboard:
 *   get:
 *     summary: Get organizer's dashboard data
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard data of the organizer
 */
router.get("/:id/dashboard", getOrganizerDashboard);

/**
 * @swagger
 * /api/organizer/{id}/event-status-summary:
 *   get:
 *     summary: Get summary of the event status for a specific organizer
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event status summary for the organizer
 */
router.get("/:id/event-status-summary", getOrganizerEventSummary);

/**
 * @swagger
 * /api/organizer/{id}/venues:
 *   get:
 *     summary: Get venues associated with a specific organizer
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of venues for the organizer
 */
router.get("/:id/venues", getOrganizerVenues);

/**
 * @swagger
 * /api/organizer/{id}/top-event:
 *   get:
 *     summary: Get the top event for a specific organizer
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The top event of the organizer
 */
router.get("/:id/top-event", getOrganizerTopEvent);

/**
 * @swagger
 * /api/organizer/{id}/all-tickets:
 *   get:
 *     summary: Get all tickets sold for events organized by a specific organizer
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organizer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all tickets sold for the organizer's events
 */
router.get("/:id/all-tickets", getOrganizerTickets);

/**
 * @swagger
 * /api/organizer:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: A list of all organizations
 */
router.get("/", authenticate, getAllOrganizations);

/**
 * @swagger
 * /api/organizer/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organization
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization details
 *       404:
 *         description: Organization not found
 */
router.get("/:id", authenticate, getOrganizationById);

/**
 * @swagger
 * /api/organizer:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the organization
 *                 example: "Event Organizer Inc."
 *               description:
 *                 type: string
 *                 description: A brief description of the organization
 *                 example: "We organize large scale events."
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, createOrganizerValidation, validate, createOrganization);

/**
 * @swagger
 * /api/organizer/{id}:
 *   put:
 *     summary: Update an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organization to update
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
 *                 description: The updated name of the organization
 *                 example: "Event Organizer Corp."
 *               description:
 *                 type: string
 *                 description: The updated description of the organization
 *                 example: "We organize events of all sizes."
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Organization not found
 */
router.put("/:id", authenticate, updateOrganizerValidation, validate, updateOrganization);

/**
 * @swagger
 * /api/organizer/{id}:
 *   delete:
 *     summary: Delete an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the organization to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 */
router.delete("/:id", authenticate, deleteOrganizerValidation, validate, deleteOrganization);

module.exports = router;
