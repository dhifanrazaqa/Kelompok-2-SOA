const express = require("express");
const {
  getAllChecklists,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} = require("../controllers/checklist.controller");
const {
  createChecklistValidation,
  updateChecklistValidation,
  deleteChecklistValidation,
} = require("../validations/checklist.validation");
const { validate } = require("../utils/validation");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Checklists
 *   description: Checklist management routes
 */

/**
 * @swagger
 * /api/checklists:
 *   get:
 *     summary: Get all checklists
 *     tags: [Checklists]
 *     responses:
 *       200:
 *         description: List of all checklists
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, authorize(['ADMIN', 'ORGANIZER']), getAllChecklists);

/**
 * @swagger
 * /api/checklists/{id}:
 *   get:
 *     summary: Get checklist by ID
 *     tags: [Checklists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the checklist
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The checklist details
 *       404:
 *         description: Checklist not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticate, getChecklistById);

/**
 * @swagger
 * /api/checklists:
 *   post:
 *     summary: Create a new checklist
 *     tags: [Checklists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 format: uuid
 *                 description: The UUID of the event this checklist belongs to
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               title:
 *                 type: string
 *                 description: The title of the checklist
 *                 example: "Venue Setup"
 *               description:
 *                 type: string
 *                 description: Description of the checklist
 *                 example: "Checklist for setting up the event venue"
 *               progress:
 *                 type: integer
 *                 format: int32
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Progress of the checklist in percentage
 *                 example: 0
 *             required:
 *               - eventId
 *               - title
 *               - progress
 *     responses:
 *       201:
 *         description: Checklist created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createChecklistValidation, validate, createChecklist);

/**
 * @swagger
 * /api/checklists/{id}:
 *   put:
 *     summary: Update an existing checklist
 *     tags: [Checklists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the checklist to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the checklist
 *                 example: "Updated Venue Setup"
 *               description:
 *                 type: string
 *                 description: Updated description of the checklist
 *                 example: "Updated checklist for setting up the event venue"
 *               progress:
 *                 type: integer
 *                 format: int32
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Progress of the checklist in percentage
 *                 example: 50
 *     responses:
 *       200:
 *         description: Checklist updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Checklist not found
 */
router.put("/:id", authenticate, updateChecklistValidation, validate, updateChecklist);

/**
 * @swagger
 * /api/checklists/{id}:
 *   delete:
 *     summary: Delete a checklist by ID
 *     tags: [Checklists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the checklist to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Checklist deleted successfully
 *       404:
 *         description: Checklist not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteChecklistValidation, validate, deleteChecklist);

module.exports = router;
