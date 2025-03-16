const express = require("express");
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.put("/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);

module.exports = router;
