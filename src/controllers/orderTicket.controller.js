const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Retrieve all order tickets.
 * @route GET /order-tickets
 */
const getAllOrderTickets = async (req, res) => {
  try {
    const orderTickets = await prisma.orderTicket.findMany();
    sendSuccess(res, "Order Tickets retrieved successfully", orderTickets);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve Order Tickets", error, 500);
  }
};

/**
 * Retrieve a single order ticket by its ID.
 * @route GET /order-tickets/:id
 * @param {string} id - The ID of the order ticket
 */
const getOrderTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderTicket = await prisma.orderTicket.findUnique({
      where: { id },
    });
    if (!orderTicket)
      return sendError(res, "Order Ticket not found", [], 404);
    sendSuccess(res, "Order Ticket retrieved successfully", orderTicket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve Order Ticket", error, 500);
  }
};

/**
 * Create a new order ticket.
 * @route POST /order-tickets
 * @body {string} userId - ID of the user placing the order
 * @body {string} ticketId - ID of the ticket being ordered
 * @body {string} eventId - ID of the related event
 * @body {number} quantity - Number of tickets ordered
 * @body {number} totalPrice - Total price of the order
 * @body {string} paymentStatus - Status of the payment
 * @body {string} orderStatus - Status of the order
 */
const createOrderTicket = async (req, res) => {
  try {
    const { userId, ticketId, eventId, quantity, totalPrice, paymentStatus, orderStatus } = req.body;

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

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket)
      return sendError(res, "Ticket not found", [
        { field: "ticketId", message: "Ticket with the provided ID does not exist" },
      ]);

    const orderTicket = await prisma.orderTicket.create({
      data: {
        userId,
        ticketId,
        eventId,
        quantity,
        totalPrice,
        paymentStatus,
        orderStatus,
      },
    });

    sendSuccess(res, "Order Ticket created successfully", orderTicket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create Order Ticket", error, 500);
  }
};

/**
 * Update an existing order ticket by its ID.
 * @route PUT /order-tickets/:id
 * @param {string} id - The ID of the order ticket
 * @body {number} quantity - Updated ticket quantity
 * @body {number} totalPrice - Updated total price
 * @body {string} paymentStatus - Updated payment status
 * @body {string} orderStatus - Updated order status
 */
const updateOrderTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, totalPrice, paymentStatus, orderStatus } = req.body;

    const orderTicketExist = await prisma.orderTicket.findUnique({
      where: { id },
    });

    if (!orderTicketExist)
      return sendError(res, "Order Ticket not found", [
        { field: "id", message: "Order Ticket with the provided ID does not exist" },
      ]);

    const orderTicket = await prisma.orderTicket.update({
      where: { id },
      data: {
        quantity,
        totalPrice,
        paymentStatus,
        orderStatus,
      },
    });

    sendSuccess(res, "Order Ticket updated successfully", orderTicket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update Order Ticket", error, 500);
  }
};

/**
 * Delete an order ticket by its ID.
 * @route DELETE /order-tickets/:id
 * @param {string} id - The ID of the order ticket
 */
const deleteOrderTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const orderTicketExist = await prisma.orderTicket.findUnique({
      where: { id },
    });

    if (!orderTicketExist)
      return sendError(res, "Order Ticket not found", [
        { field: "id", message: "Order Ticket with the provided ID does not exist" },
      ]);

    await prisma.orderTicket.delete({ where: { id } });
    sendSuccess(res, "Order Ticket deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete Order Ticket", error, 500);
  }
};

module.exports = {
  getAllOrderTickets,
  getOrderTicketById,
  createOrderTicket,
  updateOrderTicket,
  deleteOrderTicket,
};
