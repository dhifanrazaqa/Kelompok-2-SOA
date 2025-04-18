const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Retrieve all tickets.
 * @route GET /tickets
 */
const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    sendSuccess(res, "Tickets retrieved successfully", tickets);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve tickets", error, 500);
  }
};

/**
 * Retrieve a ticket by ID.
 * @route GET /tickets/:id
 * @param {string} id - Ticket ID
 */
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) return sendError(res, "Ticket not found", [], 404);

    sendSuccess(res, "Ticket retrieved successfully", ticket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve ticket", error, 500);
  }
};

/**
 * Retrieve all users who purchased a specific ticket.
 * @route GET /tickets/:id/buyers
 * @param {string} id - Ticket ID
 */
const getTicketBuyers = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        OrderTicker: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            quantity: true,
            totalPrice: true,
            paymentStatus: true,
            orderStatus: true,
          },
        },
      },
    });

    if (!ticket) return sendError(res, "Ticket not found", [], 404);

    sendSuccess(res, "Ticket with buyers retrieved successfully", ticket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve ticket with buyers", error, 500);
  }
};

/**
 * Create a new ticket for an event.
 * @route POST /tickets
 * @body { eventId, name, price, quota, sold, description }
 */
const createTicket = async (req, res) => {
  try {
    const { eventId, name, price, quota, sold, description } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event)
      return sendError(res, "Event not found", [
        {
          field: "eventId",
          message: "Event with the provided ID does not exist",
        },
      ]);

    const ticket = await prisma.ticket.create({
      data: {
        eventId,
        name,
        price,
        quota,
        sold,
        description,
      },
    });

    sendSuccess(res, "Ticket created successfully", ticket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create ticket", error, 500);
  }
};

/**
 * Update an existing ticket by ID.
 * @route PUT /tickets/:id
 * @param {string} id - Ticket ID
 * @body { name, price, quota, sold, description }
 */
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quota, sold, description } = req.body;

    const ticketExist = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticketExist)
      return sendError(res, "Ticket not found", [
        { field: "id", message: "Ticket with the provided ID does not exist" },
      ]);

    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        name,
        price,
        quota,
        sold,
        description,
      },
    });

    sendSuccess(res, "Ticket updated successfully", ticket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update ticket", error, 500);
  }
};

/**
 * Delete a ticket by ID.
 * @route DELETE /tickets/:id
 * @param {string} id - Ticket ID
 */
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticketExist = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticketExist)
      return sendError(res, "Ticket not found", [
        { field: "id", message: "Ticket with the provided ID does not exist" },
      ]);

    await prisma.ticket.delete({ where: { id } });
    sendSuccess(res, "Ticket deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete ticket", error, 500);
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketBuyers,
  createTicket,
  updateTicket,
  deleteTicket,
};
