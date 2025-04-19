const prisma = require("../config/database");
const logger = require("../config/logger");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Get all venues from the database
 */
const getAllVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany();

    venues.forEach((venue) => {
      venue.locationImage = `https://maps.googleapis.com/maps/api/staticmap?center=${venue.latitude},${venue.longitude}&zoom=15&size=600x300&markers=color:red%7C${venue.latitude},${venue.longitude}&key=${process.env.MAPS_API_KEY}`;
    });

    sendSuccess(res, "Venues retrieved successfully", venues);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve venues", error, 500);
  }
};

/**
 * Function to retrieve a venue by ID from the database
 * @param {string} req.params.id - ID of the venue to retrieve
 */
const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await prisma.venue.findUnique({
      where: { id },
    });

    if (!venue) return sendError(res, "Venue not found", [], 404);

    venue.locationImage = `https://maps.googleapis.com/maps/api/staticmap?center=${venue.latitude},${venue.longitude}&zoom=15&size=600x300&markers=color:red%7C${venue.latitude},${venue.longitude}&key=${process.env.MAPS_API_KEY}`;

    sendSuccess(res, "Venue retrieved successfully", venue);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve venue", error, 500);
  }
};

/**
 * Get events by venue city
 * Converts URL-friendly city name to proper lowercase space-separated string
 * @param {string} req.params.city - City name (Jakarta, Jawa Barat, etc.)
 */
const getEventByVenueCity = async (req, res) => {
  try {
    let { city } = req.params;

    // Replace hyphen with space for city name
    city = city.replace("-", " ").toLowerCase();

    const events = await prisma.event.findMany({
      where: { venue: { city } },
    });

    sendSuccess(res, "Events retrieved successfully", { events });
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve events", error, 500);
  }
};

/**
 * Create a new venue for an event
 * @body {string} eventId - ID of the event associated with the venue
 * @body {string} name - Name of the venue
 * @body {string} address - Address of the venue
 * @body {string} city - City where the venue is located
 * @body {number} capacity - Capacity of the venue
 * @body {number} latitude - Latitude coordinate of the venue
 * @body {number} longitude - Longitude coordinate of the venue
 */
const createVenue = async (req, res) => {
  try {
    const { eventId, name, address, city, capacity, latitude, longitude } =
      req.body;

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

    sendSuccess(res, "Venue created successfully", venue, 201);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to create venue", error, 500);
  }
};

/**
 * Function to update an existing venue by its ID
 * @param {string} req.params.id - ID of the venue to update
 * @body {string} name - Name of the venue
 * @body {string} address - Address of the venue
 * @body {string} city - City where the venue is located
 * @body {number} capacity - Capacity of the venue
 * @body {number} latitude - Latitude coordinate of the venue
 * @body {number} longitude - Longitude coordinate of the venue
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
    logger.error(error);
    sendError(res, "Failed to update venue", error, 500);
  }
};

/**
 * Function to delete a venue by its ID
 * @param {string} req.params.id - ID of the venue to delete
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
    logger.error(error);
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
