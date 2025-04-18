const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const organizationRoutes = require("./organization.routes");
const eventRoutes = require("./event.routes");
const venueRoutes = require("./venue.routes");
const checklistRoutes = require("./checklist.route");
const dcoumentRoutes = require("./document.routes");
const financeRoutes = require("./finance.routes");
const ticketRoutes = require("./ticket.routes");
const orderTicketRoutes = require("./orderTicket.routes");
const orderEventRoutes = require("./orderEvent.routes");
const cacheRoutes = require("./cache.routes");


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization routes
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * tags:
 *   name: Organizers
 *   description: Event organizers management routes
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management routes
 */

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Venue management routes
 */

/**
 * @swagger
 * tags:
 *   name: Checklists
 *   description: Checklist management routes
 */

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Documents management routes
 */

/**
 * @swagger
 * tags:
 *   name: Finances
 *   description: Finance management routes
 */

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management routes
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management routes for tickets and events
 */

/**
 * @swagger
 * tags:
 *   name: Cache
 *   description: Cache management routes
 */

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/organizer", organizationRoutes);
router.use("/event/order", orderEventRoutes);
router.use("/events", eventRoutes);
router.use("/venue", venueRoutes);
router.use("/checklist", checklistRoutes);
router.use("/document", dcoumentRoutes);
router.use("/finance", financeRoutes);
router.use("/ticket/order", orderTicketRoutes);
router.use("/ticket", ticketRoutes);
router.use("/cache", cacheRoutes);

module.exports = router;