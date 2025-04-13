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

// Complex API
router.get("/:id/events", getOrganizerEvents);
router.get("/:id/dashboard", getOrganizerDashboard);
router.get("/:id/event-status-summary", getOrganizerEventSummary);
router.get("/:id/venues", getOrganizerVenues);
router.get("/:id/top-event", getOrganizerTopEvent);
router.get("/:id/all-tickets", getOrganizerTickets);

// Simple API CRUD
router.get("/", authenticate, getAllOrganizations);
router.get("/:id", authenticate, getOrganizationById);
router.post("/", authenticate, createOrganizerValidation, validate, createOrganization);
router.put("/:id", authenticate, updateOrganizerValidation, validate, updateOrganization);
router.delete("/:id", authenticate, deleteOrganizerValidation, validate, deleteOrganization);


module.exports = router;
