const prisma = require("../config/database");
const sendEmail = require("../config/mail");
const { sendSuccess, sendError } = require("../utils/response");

const getAllOrderTickets = async (req, res) => {
  try {
    const orderTickets = await prisma.orderTicket.findMany();
    sendSuccess(res, "Order Tickets retrieved successfully", orderTickets);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve Order Tickets", error, 500);
  }
};

const getOrderTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderTicket = await prisma.orderTicket.findUnique({
      where: { id },
    });
    if (!orderTicket) return sendError(res, "Order Ticket not found", [], 404);
    sendSuccess(res, "Order Ticket retrieved successfully", orderTicket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve Order Ticket", error, 500);
  }
};

const createOrderTicket = async (req, res) => {
  try {
    const {
      userId,
      ticketId,
      eventId,
      quantity,
      totalPrice,
      paymentStatus,
      orderStatus,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return sendError(res, "User not found", [
        {
          field: "userId",
          message: "User with the provided ID does not exist",
        },
      ]);

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

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket)
      return sendError(res, "Ticket not found", [
        {
          field: "ticketId",
          message: "Ticket with the provided ID does not exist",
        },
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

    const result = await sendEmail(
      "dhifanofficial@gmail.com",
      "Ticket Order Confirmation",
      "Thank you for your order. Please complete the payment as soon as possible to confirm your ticket."
    );

    console.log(result);

    sendSuccess(res, "Order Ticket created successfully", orderTicket);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create Order Ticket", error, 500);
  }
};

const updateOrderTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, totalPrice, paymentStatus, orderStatus } = req.body;

    const orderTicketExist = await prisma.orderTicket.findUnique({
      where: { id },
    });

    if (!orderTicketExist)
      return sendError(res, "Order Ticket not found", [
        {
          field: "id",
          message: "Order Ticket with the provided ID does not exist",
        },
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

const deleteOrderTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const orderTicketExist = await prisma.orderTicket.findUnique({
      where: { id },
    });

    if (!orderTicketExist)
      return sendError(res, "Order Ticket not found", [
        {
          field: "id",
          message: "Order Ticket with the provided ID does not exist",
        },
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
