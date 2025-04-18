const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Get all venues from the database
 * @route GET /venues
 */
const getAllVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany();
    sendSuccess(res, "Venues retrieved successfully", venues);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve venues", error, 500);
  }
};

/**
 * Get a single venue by its ID
 * @route GET /venues/:id
 */
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

/**
 * Get events by venue city
 * Converts URL-friendly city name to proper lowercase space-separated string
 * @route GET /venues/events/city/:city
 */
const getEventByVenueCity = async (req, res) => {
  try {
    let { city } = req.params;

    // Replace hyphen with space for city name
    city = city.replace('-', " ").toLowerCase();

    const events = await prisma.event.findMany({
      where: { venue: { city } },
    });

    sendSuccess(res, "Events retrieved successfully", { events });
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve events", error, 500);
  }
};

/**
 * Create a new venue for a specific event
 * @route POST /venues
 */
const createVenue = async (req, res) => {
  try {
    const { eventId, name, address, city, capacity, latitude, longitude } = req.body;

    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event)
      return sendError(res, "Event not found", [
        { field: "id", message: "Event with the provided ID does not exist" },
      ]);

    // Check if venue for this event already exists
    const existingVenue = await prisma.venue.findUnique({
      where: { eventId },
    });

    if (existingVenue)
      return sendError(res, "Venue already created", [
        { field: "id", message: "User already created a Venue" },
      ]);

    // Create new venue
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

/**
 * Update a venue by its ID
 * @route PUT /venues/:id
 */
const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, capacity, latitude, longitude } = req.body;

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

/**
 * Delete a venue by its ID
 * @route DELETE /venues/:id
 */
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
