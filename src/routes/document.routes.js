const express = require("express");
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/document.controller");
const {
  createDocumentValidation,
  updateDocumentValidation,
  deleteDocumentValidation,
} = require("../validations/document.validaton");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document management routes
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of all documents
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The document details
 *       404:
 *         description: Document not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticate, getDocumentById);

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Create a new document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the document
 *                 example: Event Proposal
 *               content:
 *                 type: string
 *                 description: The content of the document
 *                 example: This document contains the proposal for the upcoming event.
 *     responses:
 *       201:
 *         description: Document created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createDocumentValidation, validate, createDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Update an existing document
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the document
 *                 example: Updated Event Proposal
 *               content:
 *                 type: string
 *                 description: The updated content of the document
 *                 example: This document contains the updated proposal for the upcoming event.
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Document not found
 */
router.put("/:id", authenticate, updateDocumentValidation, validate, updateDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteDocumentValidation, validate, deleteDocument);

module.exports = router;
