const prisma = require("../config/database");
const sendEmail = require("../config/mail");
const PDFDocument = require("pdfkit");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Retrieve all order tickets.
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
 * Function to generate and return an invoice PDF for a specific order ticket by its ID
 * @param {string} req.params.id - ID of the order ticket to retrieve
 */
const getOrderTicketByIdInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const orderTicket = await prisma.orderTicket.findUnique({
      where: { id },
      include: {
        user: true,
        event: true,
        ticket: true,
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.pipe(res);

    // === Header ===
    doc.fillColor("#333").fontSize(26).text("INVOICE", { align: "right" });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" })
      .text(`Invoice #: INV-${orderTicket.id}`, { align: "right" })
      .moveDown(2);

    // === Company Info ===
    doc
      .fillColor("#000")
      .fontSize(16)
      .text("Event Organizer App.", { align: "left" })
      .fontSize(10)
      .text("UPN Veteran Jakarta", { align: "left" })
      .text("Jakarta, Indonesia", { align: "left" })
      .text("Phone: +62 812 3456 7890", { align: "left" })
      .moveDown(2);

    // === Bill To ===
    doc
      .fillColor("#000")
      .fontSize(14)
      .text("Bill To:", { underline: true })
      .fontSize(12)
      .text(orderTicket.user.name)
      .text(orderTicket.user.phone)
      .text(orderTicket.user.address)
      .moveDown(2);

    // === Items Table ===
    const tableTop = 320;

    doc
      .fontSize(12)
      .text("Description", 50, tableTop)
      .text("Qty", 300, tableTop)
      .text("Price", 350, tableTop)
      .text("Total", 450, tableTop);

    doc
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    doc
      .text(orderTicket.ticket.name, 50, tableTop + 30)
      .text(orderTicket.quantity, 300, tableTop + 30)
      .text(`$${orderTicket.ticket.price.toFixed(2)}`, 350, tableTop + 30)
      .text(`$${orderTicket.totalPrice.toFixed(2)}`, 450, tableTop + 30);

    // === Total Section ===
    doc
      .fontSize(14)
      .text("Total", 400, tableTop + 100)
      .text(`$${orderTicket.totalPrice.toFixed(2)}`, 400, tableTop + 100, {
        align: "right",
      });

    // === Footer ===
    doc
      .fontSize(10)
      .fillColor("#555")
      .text("Thank you for your order!", 50, 750, {
        align: "center",
        width: 500,
      });

    doc.end();
  } catch (error) {
    console.error("Failed to generate invoice PDF:", error);
    sendError(res, "Failed to generate PDF invoice", error, 500);
  }
};

/**
 * Retrieve a single order ticket by its ID.
 * @param {string} req.params.id - The ID of the order ticket
 */
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

/**
 * Create a new order ticket.
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

/**
 * Update an existing order ticket by its ID.
 * @param {string} req.params.id - The ID of the order ticket
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

/**
 * Delete an order ticket by its ID.
 * @param {string} req.params.id - The ID of the order ticket
 */
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
  getOrderTicketByIdInvoice,
  getOrderTicketById,
  createOrderTicket,
  updateOrderTicket,
  deleteOrderTicket,
};
