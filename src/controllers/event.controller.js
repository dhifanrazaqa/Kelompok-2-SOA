const prisma = require("../config/database");
const redis = require("../config/redis");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Mengambil semua event dari database dan menyimpannya ke cache Redis.
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllEvents = async (req, res) => {
  try {
    const cacheKey = "events";
    const events = await prisma.event.findMany();
    await redis.set(cacheKey, JSON.stringify(events), "EX", 60);
    sendSuccess(res, "Events retrieved successfully", events);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve events", error, 500);
  }
};

/**
 * Mengambil detail sebuah event berdasarkan ID-nya dan menyimpannya ke cache Redis.
 * @param {Request} req 
 * @param {Response} res 
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

    await redis.set(cacheKey, JSON.stringify(event), "EX", 60);
    sendSuccess(res, "Event retrieved successfully", event);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event", error, 500);
  }
};

/**
 * Mengambil tiket-tiket dari sebuah event tertentu dan menyimpannya ke cache Redis.
 * @param {Request} req 
 * @param {Response} res 
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
    console.error(error);
    sendError(res, "Failed to retrieve event with tickets", error, 500);
  }
};

/**
 * Mengambil checklist dari sebuah event dan menyimpannya ke cache Redis.
 * @param {Request} req 
 * @param {Response} res 
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
    console.error(error);
    sendError(res, "Failed to retrieve event with checklist", error, 500);
  }
};

/**
 * Mengambil dokumen dari sebuah event dan menyimpannya ke cache Redis.
 * @param {Request} req 
 * @param {Response} res 
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
    console.error(error);
    sendError(res, "Failed to retrieve event with documents", error, 500);
  }
};

/**
 * Mengambil peserta dari sebuah event yang status pembayarannya sudah "PAID" dan order-nya "CONFIRMED".
 * @param {Request} req 
 * @param {Response} res 
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
    console.error(error);
    sendError(res, "Failed to retrieve event with participants", error, 500);
  }
};

/**
 * Mengambil event-event yang paling populer berdasarkan jumlah tiket yang terjual.
 * @param {Request} req 
 * @param {Response} res 
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
    sendSuccess(res, "Most popular events retrieved successfully", sortedEvents);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve most popular events", error, 500);
  }
};

/**
 * Mengambil event yang akan datang dalam waktu 7 hari dari sekarang.
 * @param {Request} req 
 * @param {Response} res 
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
    console.error(error);
    sendError(res, "Failed to retrieve upcoming events", error, 500);
  }
};

/**
 * Membuat event baru setelah memastikan organizer terkait ada.
 * @param {Request} req 
 * @param {Response} res 
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
    sendSuccess(res, "Event created successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create event", error, 500);
  }
};

/**
 * Memperbarui event berdasarkan ID.
 * @param {Request} req 
 * @param {Response} res 
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
    console.error(error);
    sendError(res, "Failed to update event", error, 500);
  }
};

/**
 * Menghapus event berdasarkan ID.
 * @param {Request} req 
 * @param {Response} res 
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

    await prisma.event.delete({ where: { id } });
    sendSuccess(res, "Event deleted successfully", null);
  } catch (error) {
    console.error(error);
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
