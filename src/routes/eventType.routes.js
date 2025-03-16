const express = require("express");
const {
  getAllEventTypes,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
} = require("../controllers/eventType.controller");

const router = express.Router();

router.get("/", getAllEventTypes);
router.get("/:id", getEventTypeById);
router.post("/", createEventType);
router.put("/:id", updateEventType);
router.delete("/:id", deleteEventType);

module.exports = router;
