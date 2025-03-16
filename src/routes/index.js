const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const organizationRoutes = require("./organization.routes");
const priceRangeRoutes = require("./pricerange.routes");
const eventPackageRoutes = require("./eventPackage.routes");
const eventTypeRoutes = require("./eventType.routes");
const bookingRoutes = require("./booking.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/organizations", organizationRoutes);
router.use("/pricerange", priceRangeRoutes);
router.use("/eventTypes", eventTypeRoutes);
router.use("/eventPackages", eventPackageRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
