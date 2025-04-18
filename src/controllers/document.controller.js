const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const getAllDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany();
    sendSuccess(res, "Documents retrieved successfully", documents);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve documents", error, 500);
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id },
    });
    if (!document) return sendError(res, "Document not found", [], 404);
    sendSuccess(res, "Document retrieved successfully", document);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve document", error, 500);
  }
};

const createDocument = async (req, res) => {
  try {
    const { eventId, name } = req.body;
    const result = await cloudinary.uploader
      .upload(req.file.path, {
        folder: "eoapp",
        resource_type: "auto",
      })
      .catch(() => {
        return sendError(res, "Upload failed", [
          { field: "image", message: "Failed to upload image" },
        ]);
      });

    fs.unlinkSync(req.file.path);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event)
      return sendError(res, "Event not found", [
        { field: "id", message: "Event with the provided ID does not exist" },
      ]);

    const document = await prisma.document.create({
      data: {
        eventId,
        name,
        url: result.secure_url,
      },
    });
    sendSuccess(res, "Document created successfully", document);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create document", error, 500);
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;

    const documentExist = await prisma.document.findUnique({
      where: { id },
    });

    if (!documentExist)
      return sendError(res, "Document not found", [
        {
          field: "id",
          message: "Document with the provided ID does not exist",
        },
      ]);

    const document = await prisma.document.update({
      where: { id },
      data: {
        name,
        url,
      },
    });
    sendSuccess(res, "Document updated successfully", document);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update document", error, 500);
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const documentExist = await prisma.document.findUnique({
      where: { id },
    });

    if (!documentExist)
      return sendError(res, "Document not found", [
        {
          field: "id",
          message: "Document with the provided ID does not exist",
        },
      ]);

    await prisma.document.delete({ where: { id } });
    sendSuccess(res, "Document deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete document", error, 500);
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
