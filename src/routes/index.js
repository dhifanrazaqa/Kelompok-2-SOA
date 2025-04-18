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

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/organizer", organizationRoutes);
router.use("/event/order", orderEventRoutes);
router.use("/events", eventRoutes);
router.use("/venue", venueRoutes);
router.use("/checklists", checklistRoutes);
router.use("/documents", dcoumentRoutes);
router.use("/finance", financeRoutes);
router.use("/ticket/order", orderTicketRoutes);
router.use("/ticket", ticketRoutes);
router.use("/cache", cacheRoutes);

module.exports = router;