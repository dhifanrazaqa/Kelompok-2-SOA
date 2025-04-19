const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * Retrieves all checklists from the database.
 */
const getAllChecklists = async (req, res) => {
  try {
    const checklists = await prisma.checklist.findMany();
    sendSuccess(res, "Checklists retrieved successfully", checklists);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve checklists", error, 500);
  }
};

/**
 * Function to retrieve a checklist by ID
 * @param {string} req.params.id - ID of the checklist to retrieve
 */
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

/**
 * Function to create a new checklist for a specific event
 * @body {string} eventId - ID of the event to associate with the checklist
 * @body {string} title - Title of the checklist
 * @body {string} description - Description of the checklist
 * @body {number} progress - Progress percentage of the checklist
 */
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
    sendSuccess(res, "Checklist created successfully", checklist, 201);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create checklist", error, 500);
  }
};

/**
 * Function to update an existing checklist by its ID
 * @param {string} req.params.id - ID of the checklist to update
 * @body {string} title - New title for the checklist
 * @body {string} description - New description for the checklist
 * @body {number} progress - New progress value for the checklist
 */
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

/**
 * Function to delete a checklist by its ID
 * @param {string} req.params.id - ID of the checklist to delete
 */
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
