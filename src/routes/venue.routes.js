const express = require("express");
const {
  getAllVenues,
  getVenueById,
  getEventByVenueCity,
  createVenue,
  updateVenue,
  deleteVenue,
} = require("../controllers/venue.controller");
const {
  createVenueValidation,
  updateVenueValidation,
  deleteVenueValidation,
} = require("../validations/venue.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/:city/events", getEventByVenueCity);
router.get("/", authenticate, getAllVenues);
router.get("/:id", authenticate, getVenueById);
router.post("/", authenticate, createVenueValidation, validate, createVenue);
router.put("/:id", authenticate, updateVenueValidation, validate, updateVenue);
router.delete("/:id", authenticate, deleteVenueValidation, validate, deleteVenue);

module.exports = router;
