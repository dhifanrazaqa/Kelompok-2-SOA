const express = require("express");
const userRoutes = require("./user.routes");

const organizationRoutes = require("./organization.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/organizations", organizationRoutes);

module.exports = router;
