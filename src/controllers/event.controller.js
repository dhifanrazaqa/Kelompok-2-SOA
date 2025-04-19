const prisma = require("../config/database");
const logger = require("../config/logger");
const redis = require("../config/redis");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Function to retrieve all events and cache the result
 */
const getAllEvents = async (req, res) => {
  try {
    const cacheKey = "events";
    const events = await prisma.event.findMany();
    await redis.set(cacheKey, JSON.stringify(events), "EX", 60);
    sendSuccess(res, "Events retrieved successfully", events);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve events", error, 500);
  }
};

/**
 * Function to retrieve an event by ID, including related data such as organizer, checklist, documents, tickets, and venue.
 * @param {string} req.params.id - ID of the event to retrieve
 */
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}`;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            organizationName: true,
            contactName: true,
            contactPhone: true,
            contactEmail: true,
          },
        },
        checklist: {
          select: {
            id: true,
            title: true,
            description: true,
            progress: true,
          },
        },
        documents: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        tickets: {
          select: {
            id: true,
            name: true,
            price: true,
            quota: true,
            sold: true,
            description: true,
          },
        },
        venue: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            capacity: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    if (!event) return sendError(res, "Event not found", [], 404);

    if (event.venue) {
      event.venue.locationImage = `https://maps.googleapis.com/maps/api/staticmap?center=${event.venue.latitude},${event.venue.longitude}&zoom=15&size=600x300&markers=color:red%7C${event.venue.latitude},${event.venue.longitude}&key=${process.env.MAPS_API_KEY}`;
    }

    await redis.set(cacheKey, JSON.stringify(event), "EX", 60);
    sendSuccess(res, "Event retrieved successfully", event);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve event", error, 500);
  }
};

/**
 * Function to retrieve an event along with its tickets by event ID
 * @param {string} req.params.id - ID of the event to retrieve
 */
const getEventTickets = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}:tickets`;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        tickets: {
          select: {
            id: true,
            name: true,
            price: true,
            quota: true,
            sold: true,
            description: true,
          },
        },
      },
    });

    if (!event) return sendError(res, "Event not found", [], 404);

    await redis.set(cacheKey, JSON.stringify(event), "EX", 60);
    sendSuccess(res, "Event with tickets retrieved successfully", event);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve event with tickets", error, 500);
  }
};

/**
 * Function to retrieve an event with its checklist by ID
 * @param {string} req.params.id - ID of the event to retrieve
 */
const getEventChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}:checklist`;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        checklist: {
          select: {
            id: true,
            title: true,
            description: true,
            progress: true,
          },
        },
      },
    });

    if (!event) return sendError(res, "Event not found", [], 404);

    await redis.set(cacheKey, JSON.stringify(event), "EX", 60);
    sendSuccess(res, "Event with checklist retrieved successfully", event);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve event with checklist", error, 500);
  }
};

/**
 * Function to retrieve an event and its associated documents by event ID
 * @param {string} req.params.id - ID of the event to retrieve
 */
const getEventDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}:documents`;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        documents: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });

    if (!event) return sendError(res, "Event not found", [], 404);

    await redis.set(cacheKey, JSON.stringify(event), "EX", 60);
    sendSuccess(res, "Event with documents retrieved successfully", event);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve event with documents", error, 500);
  }
};

/**
 * Function to retrieve participants of an event by event ID
 * @param {string} req.params.id - ID of the event to retrieve participants for
 */
const getEventParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        OrderTicker: {
          where: {
            paymentStatus: "PAID",
            orderStatus: "CONFIRMED",
          },
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
              },
            },
          },
        },
      },
    });

    if (!event) return sendError(res, "Event not found", [], 404);
    sendSuccess(res, "Event with participants retrieved successfully", event);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve event with participants", error, 500);
  }
};

/**
 * Function to retrieve the most popular events based on ticket sales
 */
const getMostPopularEvents = async (req, res) => {
  try {
    const cacheKey = "event:popular";
    const events = await prisma.event.findMany({
      include: {
        tickets: {
          select: {
            id: true,
            name: true,
            price: true,
            quota: true,
            sold: true,
            description: true,
          },
        },
      },
    });

    const sortedEvents = events
      .map((event) => ({
        ...event,
        totalTicketsSold: event.tickets.reduce(
          (sum, ticket) => sum + ticket.sold,
          0
        ),
      }))
      .sort((a, b) => b.totalTicketsSold - a.totalTicketsSold);

    if (sortedEvents.length === 0)
      return sendError(res, "No events found", [], 404);

    await redis.set(cacheKey, JSON.stringify(sortedEvents), "EX", 60);
    sendSuccess(
      res,
      "Most popular events retrieved successfully",
      sortedEvents
    );
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve most popular events", error, 500);
  }
};

/**
 * Function to retrieve upcoming events within the next 7 days
 */
const getUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
      },
      select: {
        id: true,
        title: true,
        type: true,
        target: true,
        budgetRange: true,
        thumbnail: true,
        description: true,
        startDate: true,
        endDate: true,
        picName: true,
        picPhone: true,
        picEmail: true,
        status: true,
        organizer: {
          select: {
            id: true,
            organizationName: true,
            contactName: true,
            contactPhone: true,
            contactEmail: true,
          },
        },
        venue: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            capacity: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    if (upcomingEvents.length === 0)
      return sendError(res, "No upcoming events found", [], 404);

    sendSuccess(res, "Upcoming events retrieved successfully", upcomingEvents);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve upcoming events", error, 500);
  }
};

/**
 * Function to handle the creation of a new event
 * @body {string} title - Title of the event
 * @body {string} type - Type of the event
 * @body {string} target - Target audience of the event
 * @body {string} budgetRange - Budget range for the event
 * @body {string} organizerId - ID of the organizer
 * @body {string} thumbnail - Thumbnail image URL for the event
 * @body {string} description - Description of the event
 * @body {string} startDate - Start date of the event
 * @body {string} endDate - End date of the event
 * @body {string} picName - Name of the person in charge (PIC)
 * @body {string} picPhone - Phone number of the PIC
 * @body {string} picEmail - Email address of the PIC
 * @body {string} status - Status of the event
 */
const createEvent = async (req, res) => {
  try {
    const {
      title,
      type,
      target,
      budgetRange,
      organizerId,
      thumbnail,
      description,
      startDate,
      endDate,
      picName,
      picPhone,
      picEmail,
      status,
    } = req.body;

    const existingOrg = await prisma.organizer.findUnique({
      where: { id: organizerId },
    });

    if (!existingOrg)
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);

    await prisma.event.create({
      data: {
        title,
        type,
        target,
        budgetRange,
        organizerId,
        thumbnail,
        description,
        startDate,
        endDate,
        picName,
        picPhone,
        picEmail,
        status,
      },
    });
    sendSuccess(res, "Event created successfully", null, 201);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to create event", error, 500);
  }
};

/**
 * Function to update an existing event by ID
 * @param {string} req.params.id - ID of the event to update
 * @body {string} title - Title of the event
 * @body {string} type - Type of the event
 * @body {string} target - Target audience of the event
 * @body {string} budgetRange - Budget range for the event
 * @body {string} thumbnail - Thumbnail URL for the event
 * @body {string} description - Description of the event
 * @body {string} startDate - Start date of the event
 * @body {string} endDate - End date of the event
 * @body {string} picName - Name of the person in charge (PIC)
 * @body {string} picEmail - Email of the person in charge (PIC)
 * @body {string} status - Status of the event
 */
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      target,
      budgetRange,
      thumbnail,
      description,
      startDate,
      endDate,
      picName,
      picEmail,
      status,
    } = req.body;

    const isEventExist = await prisma.event.findUnique({
      where: { id },
    });

    if (!isEventExist)
      return sendError(res, "Event not found", [
        { field: "id", message: "Event with the provided ID does not exist" },
      ]);

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        type,
        target,
        budgetRange,
        thumbnail,
        description,
        startDate,
        endDate,
        picName,
        picEmail,
        status,
      },
    });
    sendSuccess(res, "Event updated successfully", event);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to update event", error, 500);
  }
};

/**
 * Function to delete an event by its ID
 * @param {string} req.params.id - ID of the event to delete
 */
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const isEventExist = await prisma.event.findUnique({
      where: { id },
    });

    if (!isEventExist)
      return sendError(res, "Event not found", [
        { field: "id", message: "Event with the provided ID does not exist" },
      ]);
    logger.log(isEventExist);
    await prisma.event.delete({ where: { id } });
    sendSuccess(res, "Event deleted successfully", null);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to delete event", error, 500);
  }
};

module.exports = {
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
};
