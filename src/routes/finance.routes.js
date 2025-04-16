const express = require("express");
const {
  getAllFinances,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
} = require("../controllers/finance.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Finances
 *   description: Finance management routes
 */

/**
 * @swagger
 * /api/finances:
 *   get:
 *     summary: Get all finances
 *     tags: [Finances]
 *     responses:
 *       200:
 *         description: A list of all finances
 */
router.get("/", getAllFinances);

/**
 * @swagger
 * /api/finances/{id}:
 *   get:
 *     summary: Get finance by ID
 *     tags: [Finances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the finance record
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The finance record
 *       404:
 *         description: Finance record not found
 */
router.get("/:id", getFinanceById);

/**
 * @swagger
 * /api/finances:
 *   post:
 *     summary: Create a new finance record
 *     tags: [Finances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the finance record
 *                 example: 1000.50
 *               description:
 *                 type: string
 *                 description: The description of the finance record
 *                 example: Event revenue
 *               date:
 *                 type: string
 *                 description: The date of the finance record
 *                 example: 2025-04-15
 *     responses:
 *       201:
 *         description: Finance record created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createFinance);

/**
 * @swagger
 * /api/finances/{id}:
 *   put:
 *     summary: Update an existing finance record
 *     tags: [Finances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the finance record to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The updated amount
 *                 example: 1200.75
 *               description:
 *                 type: string
 *                 description: The updated description
 *                 example: Updated event revenue
 *               date:
 *                 type: string
 *                 description: The updated date
 *                 example: 2025-04-20
 *     responses:
 *       200:
 *         description: Finance record updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Finance record not found
 */
router.put("/:id", updateFinance);

/**
 * @swagger
 * /api/finances/{id}:
 *   delete:
 *     summary: Delete a finance record by ID
 *     tags: [Finances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the finance record to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Finance record deleted successfully
 *       404:
 *         description: Finance record not found
 */
router.delete("/:id", deleteFinance);

module.exports = router;
