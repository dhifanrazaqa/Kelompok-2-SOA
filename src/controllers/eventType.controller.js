const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await prisma.eventType.findMany();
    sendSuccess(res, "Event Types retrieved successfully", eventTypes);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event types", error, 500);
  }
};

const getEventTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await prisma.eventType.findUnique({ where: { id } });
    if (!eventType) return sendError(res, "Event Type not found", [], 404);
    sendSuccess(res, "Event Type retrieved successfully", eventType);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event type", error, 500);
  }
};

const createEventType = async (req, res) => {
  try {
    const data = req.body;
    const eventType = await prisma.eventType.create({ data });
    sendSuccess(res, "Event Type created successfully", eventType);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create event type", error, 500);
  }
};

const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const eventType = await prisma.eventType.update({ where: { id }, data });
    sendSuccess(res, "Event Type updated successfully", eventType);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update event type", error, 500);
  }
};

const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.eventType.delete({ where: { id } });
    sendSuccess(res, "Event Type deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete event type", error, 500);
  }
};

module.exports = {
  getAllEventTypes,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
};
