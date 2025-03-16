const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllEventPackages = async (req, res) => {
  try {
    const eventPackages = await prisma.eventPackage.findMany({
      include: { priceRange: true, eventType: true },
    });
    sendSuccess(res, "Event Packages retrieved successfully", eventPackages);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event packages", error, 500);
  }
};

const getEventPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const eventPackage = await prisma.eventPackage.findUnique({
      where: { id },
      include: { priceRange: true, eventType: true },
    });
    if (!eventPackage)
      return sendError(res, "Event Package not found", [], 404);
    sendSuccess(res, "Event Package retrieved successfully", eventPackage);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve event package", error, 500);
  }
};

const createEventPackage = async (req, res) => {
  try {
    const data = req.body;
    const eventPackage = await prisma.eventPackage.create({ data });
    sendSuccess(res, "Event Package created successfully", eventPackage);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create event package", error, 500);
  }
};

const updateEventPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const eventPackage = await prisma.eventPackage.update({
      where: { id },
      data,
    });
    sendSuccess(res, "Event Package updated successfully", eventPackage);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update event package", error, 500);
  }
};

const deleteEventPackage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.eventPackage.delete({ where: { id } });
    sendSuccess(res, "Event Package deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete event package", error, 500);
  }
};

module.exports = {
  getAllEventPackages,
  getEventPackageById,
  createEventPackage,
  updateEventPackage,
  deleteEventPackage,
};
