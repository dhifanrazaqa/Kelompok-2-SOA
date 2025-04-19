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
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {
  createEventValidation,
  updateEventValidation,
  deleteEventValidation,
} = require("../validations/event.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

router.get("/:id/tickets", getEventTickets);
router.get("/:id/checklists", getEventChecklist);
router.get("/:id/documents", getEventDocuments);
router.get("/:id/participants", getEventParticipants);
router.get("/popular", getMostPopularEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", authorize(['ADMIN', 'ORGANIZER']), authenticate, createEventValidation, validate, createEvent);
router.put("/:id", authorize(['ADMIN', 'ORGANIZER']), authenticate, updateEventValidation, validate, updateEvent);
router.delete("/:id", authorize(['ADMIN', 'ORGANIZER']), authenticate, deleteEventValidation, validate, deleteEvent);

module.exports = router;
