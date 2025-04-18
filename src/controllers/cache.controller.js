const { sendSuccess, sendError } = require("../utils/response");
const { hashPassword } = require("../utils/password");
const prisma = require("../config/database");
const redis = require("../config/redis");

/**
 * Function to add user cache to redis
 * @body {string} name - User's name
 * @body {string} email - User's email
 * @body {string} password - User's password
 * @body {string} phone - User's phone number
 * @body {string} address - User's address
 * @body {string} role - User's role
 */
const registerUserCache = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      sendError(
        res,
        "Registration failed",
        [{ field: "email", message: "Email already in use" }],
        400
      );
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, address, role },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        organizer: true,
      },
    });

    const cacheKey = `user:${user.id}`;
    await redis.set(cacheKey, JSON.stringify(user), "EX", 3600);

    sendSuccess(res, "User created successfully", user);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create user", [
      {
        field: "server",
        message: "An error occurred while creating user",
      },
    ], 500);
  }
};

/**
 * Function to retrieve a user by ID from the cache
 * @param {string} req.params.id - ID of the user to retrieve
 */
const getUserByIdCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `user:${id}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const user = JSON.parse(cachedData);
      return sendSuccess(res, "User retrieved successfully from cache", user);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve user from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the user from cache",
      },
    ], 500);
  }
};

/**
 * Function to delete a user from the cache by ID
 * @param {string} req.params.id - ID of the user to delete from the cache
 */
const deleteUserCache = async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `user:${id}`;
    const cachedData = await redis.get(cacheKey);

    if (!cachedData) {
      return sendError(res, "Cache not found", [
        { field: "cache", message: "No cached data available for this" }
      ], 404);
    }

    await redis.del(cacheKey);

    sendSuccess(res, "User deleted successfully from cache", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete user from cache", [
      {
        field: "server",
        message: "An error occurred while deleting the user from cache",
      },
    ], 500);
  }
};

/**
 * Function to create a new event and store it in the cache
 * @body {string} title - Title of the event
 * @body {string} type - Type of the event
 * @body {string} target - Target audience of the event
 * @body {string} budgetRange - Budget range for the event
 * @body {string} organizerId - ID of the organizer creating the event
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

    const event = await prisma.event.create({
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

    const cacheKey = `event:${event.id}`;
    await redis.set(cacheKey, JSON.stringify(event), "EX", 3600);

    sendSuccess(res, "Event created successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create event", error, 500);
  }
};

/**
 * Function to retrieve an event by ID from the cache
 * @param {string} req.params.id - ID of the event to retrieve
 */
const getEventByIdCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const event = JSON.parse(cachedData);
      return sendSuccess(res, "Event retrieved successfully from cache", event);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this event" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the event from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve all events from the cache
 */
const getAllEventsCache = async (req, res) => {
  try {
    const cacheKey = `events`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const events = JSON.parse(cachedData);
      return sendSuccess(res, "Events retrieved successfully from cache", events);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for events" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve events from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving events from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve an event checklist by ID from the cache
 * @param {string} req.params.id - ID of the event to retrieve
 */
const getEventChecklistCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}:checklist`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const checklist = JSON.parse(cachedData);
      return sendSuccess(res, "Event checklist retrieved successfully from cache", checklist);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this event checklist" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event checklist from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the event checklist from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve event documents by ID from the cache
 * @param {string} req.params.id - ID of the event to retrieve documents for
 */
const getEventDocumentCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}:documents`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const document = JSON.parse(cachedData);
      return sendSuccess(res, "Event documents retrieved successfully from cache", document);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this event documents" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event documents from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the event documents from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve popular events from the cache
 */
const getEventPopularCache = async (req, res) => {
  try {
    const cacheKey = `event:popular`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const popularEvents = JSON.parse(cachedData);
      return sendSuccess(res, "Popular events retrieved successfully from cache", popularEvents);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for popular events" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve popular events from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving popular events from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve event tickets by ID from the cache
 * @param {string} req.params.id - ID of the event to retrieve tickets for
 */
const getEventTicketsCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}:tickets`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const tickets = JSON.parse(cachedData);
      return sendSuccess(res, "Event tickets retrieved successfully from cache", tickets);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this event tickets" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event tickets from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the event tickets from cache",
      },
    ], 500);
  }
};

/**
 * Function to delete an event from the cache by its ID
 * @param {string} req.params.id - ID of the event to delete from the cache
 */
const deleteEventCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `event:${id}`;
    const cachedData = await redis.get(cacheKey);

    if (!cachedData) {
      return sendError(res, "Cache not found", [
        { field: "cache", message: "No cached data available for this event" }
      ], 404);
    }

    await redis.del(cacheKey);
    sendSuccess(res, "Event deleted successfully from cache", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete event from cache", [
      {
        field: "server",
        message: "An error occurred while deleting the event from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve an organizer by ID from the cache
 * @param {string} req.params.id - ID of the organizer to retrieve
 */
const getOrganizerByIdCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `organizer:${id}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const organizer = JSON.parse(cachedData);
      return sendSuccess(res, "Organizer retrieved successfully from cache", organizer);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this organizer" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve organizer from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the organizer from cache",
      },
    ], 500);
  }
};

/**
 * Function to retrieve the top event of an organizer from the cache
 * @param {string} req.params.id - ID of the organizer to retrieve the top event for
 */
const getOrganizerTopEventCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `organizer:${id}:top-event`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const topEvent = JSON.parse(cachedData);
      return sendSuccess(res, "Organizer's top event retrieved successfully from cache", topEvent);
    }

    sendError(res, "Cache not found", [
      { field: "cache", message: "No cached data available for this organizer's top event" }
    ], 404);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve organizer's top event from cache", [
      {
        field: "server",
        message: "An error occurred while retrieving the organizer's top event from cache",
      },
    ], 500);
  }
};

module.exports = {
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
};
