const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany();
    sendSuccess(res, "Venues retrieved successfully", venues);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve venues", error, 500);
  }
};

const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await prisma.venue.findUnique({
      where: { id },
    });
    if (!venue) return sendError(res, "Venue not found", [], 404);
    sendSuccess(res, "Venue retrieved successfully", venue);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve venue", error, 500);
  }
};

const getEventByVenueCity = async (req, res) => {
  try {
    let { city } = req.params;

    city = city.replace('-', " ").toLowerCase();

    console.log(city);

    const events = await prisma.event.findMany({
      where: { venue: { city } },
    });

    sendSuccess(res, "Events retrieved successfully", {
      events,
    });
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve events", error, 500);
  }
};

const createVenue = async (req, res) => {
  try {
    const { eventId, name, address, city, capacity, latitude, longitude } =
      req.body;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event)
      return sendError(res, "Event not found", [
        { field: "id", message: "Event with the provided ID does not exist" },
      ]);

    const existingVenue = await prisma.venue.findUnique({
      where: { eventId },
    });

    if (existingVenue)
      return sendError(res, "Venue already created", [
        { field: "id", message: "User already created a Venue" },
      ]);

    const venue = await prisma.venue.create({
      data: {
        eventId,
        name,
        address,
        city,
        capacity,
        latitude,
        longitude,
      },
    });
    sendSuccess(res, "Venue created successfully", venue);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create venue", error, 500);
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, capacity, latitude, longitude } =
      req.body;

    const venueExist = await prisma.venue.findUnique({
      where: { id },
    });

    if (!venueExist)
      return sendError(res, "Venue not found", [
        { field: "id", message: "Venue with the provided ID does not exist" },
      ]);

    const venue = await prisma.venue.update({
      where: { id },
      data: {
        name,
        address,
        city,
        capacity,
        latitude,
        longitude,
      },
    });
    sendSuccess(res, "Venue updated successfully", venue);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update venue", error, 500);
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;

    const venueExist = await prisma.venue.findUnique({
      where: { id },
    });

    if (!venueExist)
      return sendError(res, "Venue not found", [
        { field: "id", message: "Venue with the provided ID does not exist" },
      ]);

    await prisma.venue.delete({ where: { id } });
    sendSuccess(res, "Venue deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete venue", error, 500);
  }
};

module.exports = {
  getAllVenues,
  getVenueById,
  getEventByVenueCity,
  createVenue,
  updateVenue,
  deleteVenue,
};
