const prisma = require("../config/database");
const logger = require("../config/logger");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Retrieve all order events.
 */
const getAllOrderEvents = async (req, res) => {
  try {
    const orderEvents = await prisma.orderEvent.findMany();
    sendSuccess(res, "Order Events retrieved successfully", orderEvents);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve order events", error, 500);
  }
};

/**
 * Retrieve a single order event by its ID.
 * @param {string} req.params.id - The ID of the order event
 */
const getOrderEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderEvent = await prisma.orderEvent.findUnique({
      where: { id },
    });
    if (!orderEvent)
      return sendError(res, "Order Event not found", [], 404);
    sendSuccess(res, "Order Event retrieved successfully", orderEvent);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to retrieve Order Event", error, 500);
  }
};

/**
 * Create a new order event.
 * @body {string} userId - ID of the user
 * @body {string} eventId - ID of the event
 * @body {string} title - Title of the order
 * @body {string} description - Description of the order
 * @body {number} totalPrice - Total price for the order
 * @body {string} paymentStatus - Status of payment
 * @body {string} orderStatus - Status of the order
 */
const createOrderEvent = async (req, res) => {
  try {
    const { userId, eventId, title, description, totalPrice, paymentStatus, orderStatus } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "userId", message: "User with the provided ID does not exist" },
      ]);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event)
      return sendError(res, "Event not found", [
        { field: "eventId", message: "Event with the provided ID does not exist" },
      ]);

    const orderEvent = await prisma.orderEvent.create({
      data: {
        userId,
        eventId,
        title,
        description,
        totalPrice,
        paymentStatus,
        orderStatus,
      },
    });

    sendSuccess(res, "Order Event created successfully", orderEvent, 201);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to create Order Event", error, 500);
  }
};

/**
 * Update an order event by its ID.
 * @param {string} req.params.id - The ID of the order event
 * @body {string} title - Updated title
 * @body {string} description - Updated description
 * @body {number} totalPrice - Updated total price
 * @body {string} paymentStatus - Updated payment status
 * @body {string} orderStatus - Updated order status
 */
const updateOrderEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, totalPrice, paymentStatus, orderStatus } = req.body;

    const orderEventExist = await prisma.orderEvent.findUnique({
      where: { id },
    });

    if (!orderEventExist)
      return sendError(res, "Order Event not found", [
        { field: "id", message: "Order Event with the provided ID does not exist" },
      ]);

    const orderEvent = await prisma.orderEvent.update({
      where: { id },
      data: {
        title,
        description,
        totalPrice,
        paymentStatus,
        orderStatus,
      },
    });

    sendSuccess(res, "Order Event updated successfully", orderEvent);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to update Order Event", error, 500);
  }
};

/**
 * Delete an order event by its ID.
 * @param {string} req.params.id - The ID of the order event
 */
const deleteOrderEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const orderEventExist = await prisma.orderEvent.findUnique({
      where: { id },
    });

    if (!orderEventExist)
      return sendError(res, "Order Event not found", [
        { field: "id", message: "Order Event with the provided ID does not exist" },
      ]);

    await prisma.orderEvent.delete({ where: { id } });
    sendSuccess(res, "Order Event deleted successfully", null);
  } catch (error) {
    logger.error(error);
    sendError(res, "Failed to delete Order Event", error, 500);
  }
};

module.exports = {
  getAllOrderEvents,
  getOrderEventById,
  createOrderEvent,
  updateOrderEvent,
  deleteOrderEvent,
};
