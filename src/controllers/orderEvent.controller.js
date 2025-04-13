const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllOrderEvents = async (req, res) => {
  try {
    const orderEvents = await prisma.orderEvent.findMany();
    sendSuccess(res, "Order Events retrieved successfully", orderEvents);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve order events", error, 500);
  }
};

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
    console.error(error);
    sendError(res, "Failed to retrieve Order Event", error, 500);
  }
};

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

    sendSuccess(res, "Order Event created successfully", orderEvent);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create Order Event", error, 500);
  }
};

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
    console.error(error);
    sendError(res, "Failed to update Order Event", error, 500);
  }
};

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
    console.error(error);
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
