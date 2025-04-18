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

router.post("/user", registerValidation, validate, registerUserCache);
router.get("/user/:id", getUserByIdCache);
router.delete("/user/:id", deleteUserCache);
router.post("/event", createEventValidation, validate, createEvent);
router.get("/events", getAllEventsCache);
router.get("/event/:id", getEventByIdCache);
router.get("/event/:id/checklist", getEventChecklistCache);
router.get("/event/:id/document", getEventDocumentCache);
router.get("/event/popular", getEventPopularCache);
router.get("/event/:id/tickets", getEventTicketsCache);
router.delete("/event/:id", deleteEventCache);
router.get("/organizer/:id", getOrganizerByIdCache);
router.get("/organizer/:id/top-event", getOrganizerTopEventCache);

module.exports = router;
