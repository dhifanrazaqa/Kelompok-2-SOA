const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

/**
 * Function to retrieve all documents from the database
 */
const getAllDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany();
    sendSuccess(res, "Documents retrieved successfully", documents);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve documents", error, 500);
  }
};

/**
 * Function to retrieve a document by ID
 * @param {string} req.params.id - ID of the document to retrieve
 */
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

/**
 * Function to handle the creation of a document and upload it to Cloudinary
 * @body {string} eventId - ID of the event associated with the document
 * @body {string} name - Name of the document
 * @body {Object} req.file - Uploaded file object
 */
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

/**
 * Function to update a document by its ID
 * @param {string} req.params.id - ID of the document to update
 * @body {string} name - New name of the document
 * @body {string} url - New URL of the document
 */
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

/**
 * Function to delete a document by its ID
 * @param {string} req.params.id - ID of the document to delete
 */
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
