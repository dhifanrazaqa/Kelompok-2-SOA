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

// Complex API
router.get("/:id/tickets", getEventTickets)
router.get("/:id/checklists", getEventChecklist)
router.get("/:id/documents", getEventDocuments)
router.get("/:id/participants", getEventParticipants)
router.get("/popular", getMostPopularEvents)
router.get("/upcoming", getUpcomingEvents)

// Simple API CRUD
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", authenticate, createEventValidation, validate, createEvent);
router.put("/:id", authenticate, updateEventValidation, validate, updateEvent);
router.delete(
  "/:id",
  authenticate,
  deleteEventValidation,
  validate,
  deleteEvent
);

module.exports = router;
