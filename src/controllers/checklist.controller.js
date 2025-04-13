const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllChecklists = async (req, res) => {
  try {
    const checklists = await prisma.checklist.findMany();
    sendSuccess(res, "Checklists retrieved successfully", checklists);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve checklists", error, 500);
  }
};

const getChecklistById = async (req, res) => {
  try {
    const { id } = req.params;
    const checklist = await prisma.checklist.findUnique({
      where: { id },
    });
    if (!checklist)
      return sendError(res, "Checklist not found", [], 404);
    sendSuccess(res, "Checklist retrieved successfully", checklist);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve checklist", error, 500);
  }
};

const createChecklist = async (req, res) => {
  try {
    const { eventId, title, description, progress } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event)
      return sendError(res, "Event not found", [
        { field: "id", message: "Event with the provided ID does not exist" },
      ]);

    const checklist = await prisma.checklist.create({
      data: {
        eventId,
        title,
        description,
        progress,
      },
    });
    sendSuccess(res, "Checklist created successfully", checklist);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create checklist", error, 500);
  }
};

const updateChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, progress } = req.body;

    const checklistExist = await prisma.checklist.findUnique({
      where: { id },
    });

    if (!checklistExist)
      return sendError(res, "Checklist not found", [
        { field: "id", message: "Checklist with the provided ID does not exist" },
      ]);

    const checklist = await prisma.checklist.update({
      where: { id },
      data: {
        title,
        description,
        progress,
      },
    });
    sendSuccess(res, "Checklist updated successfully", checklist);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update checklist", error, 500);
  }
};

const deleteChecklist = async (req, res) => {
  try {
    const { id } = req.params;

    const checklistExist = await prisma.checklist.findUnique({
      where: { id },
    });

    if (!checklistExist)
      return sendError(res, "Checklist not found", [
        { field: "id", message: "Checklist with the provided ID does not exist" },
      ]);

    await prisma.checklist.delete({ where: { id } });
    sendSuccess(res, "Checklist deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete checklist", error, 500);
  }
};

module.exports = {
  getAllChecklists,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
};
