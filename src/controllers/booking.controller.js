const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, eventPackage: true, organization: true },
    });
    sendSuccess(res, "Bookings retrieved successfully", bookings);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve bookings", error, 500);
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true, eventPackage: true, organization: true },
    });
    if (!booking) return sendError(res, "Booking not found", [], 404);
    sendSuccess(res, "Booking retrieved successfully", booking);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve booking", error, 500);
  }
};

const createBooking = async (req, res) => {
  try {
    const data = req.body;
    const booking = await prisma.booking.create({ data });
    sendSuccess(res, "Booking created successfully", booking);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create booking", error, 500);
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    sendSuccess(res, "Booking status updated successfully", booking);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update booking status", error, 500);
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.booking.delete({ where: { id } });
    sendSuccess(res, "Booking deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete booking", error, 500);
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
};
