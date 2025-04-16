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
const { authenticate } = require("../middlewares/auth.middleware");

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
router.get("/", authenticate, getAllChecklists);

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
 *               name:
 *                 type: string
 *                 description: The name of the checklist
 *                 example: Event Setup
 *               description:
 *                 type: string
 *                 description: Description of the checklist
 *                 example: Checklist for setting up the event venue
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the checklist
 *                 example: Updated Event Setup
 *               description:
 *                 type: string
 *                 description: Updated description of the checklist
 *                 example: Updated checklist for setting up the event venue
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
 *         description: ID of the checklist to delete
 *         schema:
 *           type: string
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
