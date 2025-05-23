const prisma = require("../config/database");
const logger = require("../config/logger");
const redis = require("../config/redis");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Retrieve all organizations.
 */
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organizer.findMany();
    sendSuccess(res, "Organizations retrieved successfully", organizations);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve organizations",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the organizations",
        },
      ],
      500
    );
  }
};

/**
 * Retrieve an organization by ID with caching.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `organizer:${id}`;

    const organization = await prisma.organizer.findUnique({
      where: { id },
    });

    if (!organization) {
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);
    }

    await redis.set(cacheKey, JSON.stringify(organization), 'EX', 60);
    sendSuccess(res, "Organization retrieved successfully", organization);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve organization",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the organization",
        },
      ],
      500
    );
  }
};

/**
 * Retrieve all events related to an organizer.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizerEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });

    if (!organizer)
      return sendError(res, "Organizer not found", [
        { field: "id", message: "Organizer with the provided ID does not exist" },
      ]);

    sendSuccess(res, "Organizer retrieved successfully", organizer);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve organizer", error, 500);
  }
};

/**
 * Retrieve organizer dashboard data including total events.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizerDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });

    if (!organizer)
      return sendError(res, "Organizer not found", [
        { field: "id", message: "Organizer with the provided ID does not exist" },
      ]);

    const dashboardData = {
      organizationName: organizer.organizationName,
      contactName: organizer.contactName,
      contactPhone: organizer.contactPhone,
      contactEmail: organizer.contactEmail,
      totalEvents: organizer.events.length,
      events: organizer.events.map(event => ({
        id: event.id,
        name: event.name,
        date: event.date,
        status: event.status,
      })),
    };

    sendSuccess(res, "Dashboard data retrieved successfully", dashboardData);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve dashboard data",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the dashboard data",
        },
      ],
      500
    );
  }
};

/**
 * Retrieve a summary of event statuses by organizer.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizerEventSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });

    if (!organizer)
      return sendError(res, "Organizer not found", [
        { field: "id", message: "Organizer with the provided ID does not exist" },
      ]);

    const eventStatusSummary = organizer.events.reduce((summary, event) => {
      summary[event.status] = (summary[event.status] || 0) + 1;
      return summary;
    }, {});

    const result = {
      id: organizer.id,
      organizationName: organizer.organizationName,
      contactName: organizer.contactName,
      contactPhone: organizer.contactPhone,
      contactEmail: organizer.contactEmail,
      eventStatusSummary,
    };

    sendSuccess(res, "Organizer with event summary retrieved successfully", result);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve organizer with event summary",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the data",
        },
      ],
      500
    );
  }
};

/**
 * Retrieve all venues used by an organizer through their events.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizerVenues = async (req, res) => {
  try {
    const { id } = req.params;

    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: {
          include: {
            venue: true,
          },
        },
      },
    });

    if (!organizer)
      return sendError(res, "Organizer not found", [
        { field: "id", message: "Organizer with the provided ID does not exist" },
      ]);

    const venues = organizer.events
      .filter(event => event.venue)
      .map(event => ({
        id: event.venue.id,
        name: event.venue.name,
        city: event.venue.city,
        capacity: event.venue.capacity,
      }));

    const result = {
      id: organizer.id,
      organizationName: organizer.organizationName,
      contactName: organizer.contactName,
      contactPhone: organizer.contactPhone,
      contactEmail: organizer.contactEmail,
      venues,
    };

    sendSuccess(res, "Organizer with venues retrieved successfully", result);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve organizer with venues",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the data",
        },
      ],
      500
    );
  }
};

/**
 * Retrieve the top event based on ticket sales for an organizer.
 * Cached in Redis for performance.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizerTopEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `organizer:${id}:top-event`;

    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: {
          include: {
            tickets: true,
          },
        },
      },
    });

    if (!organizer)
      return sendError(res, "Organizer not found", [
        { field: "id", message: "Organizer with the provided ID does not exist" },
      ]);

    const topEvent = organizer.events.reduce((top, event) => {
      const totalSold = event.tickets.reduce((sum, ticket) => sum + ticket.sold, 0);
      return totalSold > (top.totalSold || 0)
        ? { ...event, totalSold }
        : top;
    }, {});

    const result = {
      id: organizer.id,
      organizationName: organizer.organizationName,
      contactName: organizer.contactName,
      contactPhone: organizer.contactPhone,
      contactEmail: organizer.contactEmail,
      topEvent: topEvent.id
        ? {
            id: topEvent.id,
            title: topEvent.title,
            startDate: topEvent.startDate,
            status: topEvent.status,
            totalSold: topEvent.totalSold,
          }
        : null,
    };

    await redis.set(cacheKey, JSON.stringify(result), 'EX', 60);
    sendSuccess(res, "Organizer with top event retrieved successfully", result);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve organizer with top event",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the data",
        },
      ],
      500
    );
  }
};

/**
 * Retrieve all tickets grouped by events for an organizer.
 * @param {string} req.params.id - Organizer ID
 */
const getOrganizerTickets = async (req, res) => {
  try {
    const { id } = req.params;

    const organizer = await prisma.organizer.findUnique({
      where: { id },
      include: {
        events: {
          include: {
            tickets: true,
          },
        },
      },
    });

    if (!organizer)
      return sendError(res, "Organizer not found", [
        { field: "id", message: "Organizer with the provided ID does not exist" },
      ]);

    const eventsWithTickets = organizer.events.map(event => ({
      id: event.id,
      title: event.title,
      startDate: event.startDate,
      status: event.status,
      tickets: event.tickets.map(ticket => ({
        id: ticket.id,
        name: ticket.name,
        price: ticket.price,
        quota: ticket.quota,
        sold: ticket.sold,
      })),
    }));

    const result = {
      id: organizer.id,
      organizationName: organizer.organizationName,
      contactName: organizer.contactName,
      contactPhone: organizer.contactPhone,
      contactEmail: organizer.contactEmail,
      events: eventsWithTickets,
    };

    sendSuccess(res, "Organizer with tickets retrieved successfully", result);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to retrieve organizer with tickets",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the data",
        },
      ],
      500
    );
  }
};

/**
 * Create a new organization (only if not already created by user).
 */
const createOrganization = async (req, res) => {
  try {
    const orgData = req.body;

    const user = await prisma.user.findUnique({
      where: { id: orgData.userId },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    const existingOrg = await prisma.organizer.findUnique({
      where: { userId: orgData.userId },
    });

    if (existingOrg)
      return sendError(res, "Organizer already created", [
        { field: "id", message: "User already created an organization" },
      ]);
    
    const organization = await prisma.organizer.create({
      data: orgData,
    });

    sendSuccess(res, "Organization created successfully", organization, 201);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to create organization",
      [
        {
          field: "server",
          message: "An error occurred while creating the organization",
        },
      ],
      500
    );
  }
};

/**
 * Function to update an organization's details
 * @param {string} req.params.id - ID of the organization to update
 * @body {string} organizationName - Name of the organization
 * @body {string} contactName - Name of the contact person
 * @body {string} contactPhone - Phone number of the contact person
 * @body {string} contactEmail - Email address of the contact person
 */
const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { organizationName, contactName, contactPhone, contactEmail } = req.body;

    const existingOrg = await prisma.organizer.findUnique({
      where: { id },
    });

    if (!existingOrg)
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);

    const updatedOrg = await prisma.organizer.update({
      where: { id },
      data: {
        organizationName,
        contactName,
        contactPhone,
        contactEmail,
      },
    });

    sendSuccess(res, "Organization updated successfully", updatedOrg);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to update organization",
      [
        {
          field: "server",
          message: "An error occurred while updating the organizaiton",
        },
      ],
      500
    );
  }
};

/**
 * Function to delete an organization by its ID
 * @param {string} req.params.id - ID of the organization to delete
 */
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const existingOrg = await prisma.organizer.findUnique({
      where: { id },
    });

    if (!existingOrg)
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);

    await prisma.organizer.delete({
      where: { id },
    });

    sendSuccess(res, "Organization deleted successfully", null);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to delete organization",
      [
        {
          field: "server",
          message: "An error occurred while deleting the organization",
        },
      ],
      500
    );
  }
};

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getOrganizerEvents,
  getOrganizerDashboard,
  getOrganizerEventSummary,
  getOrganizerVenues,
  getOrganizerTopEvent,
  getOrganizerTickets,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
