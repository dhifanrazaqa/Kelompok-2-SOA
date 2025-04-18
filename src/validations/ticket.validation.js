const { body, param } = require("express-validator");

/**
 * Middleware untuk validasi input saat membuat ticket
 *
 * Validasi:
 * - eventId: wajib, UUID
 * - name: wajib, string
 * - price: wajib, float positif
 * - quota: wajib, integer positif
 * - sold: wajib, integer positif
 * - description: opsional, string
 */
const createTicketValidation = [
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required")
    .isUUID()
    .withMessage("Event ID must be a valid UUID"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("quota")
    .notEmpty()
    .withMessage("Quota is required")
    .isInt({ gt: 0 })
    .withMessage("Quota must be a positive integer"),
  body("sold")
    .notEmpty()
    .withMessage("Sold is required")
    .isInt({ gt: 0 })
    .withMessage("Sold must be a positive integer"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

/**
 * Middleware untuk validasi input saat mengupdate ticket
 *
 * Validasi:
 * - id (param): wajib, UUID
 * - name, price, quota, sold, description: opsional, dengan tipe dan batasan yang sesuai
 */
const updateTicketValidation = [
  param("id")
    .notEmpty()
    .withMessage("Ticket ID is required")
    .isUUID()
    .withMessage("Ticket ID must be a valid UUID"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("quota")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quota must be a positive integer"),
  body("sold")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Sold must be a positive integer"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

/**
 * Middleware untuk validasi input saat menghapus ticket
 *
 * Validasi:
 * - id (param): wajib, UUID
 */
const deleteTicketValidation = [
  param("id")
    .notEmpty()
    .withMessage("Ticket ID is required")
    .isUUID()
    .withMessage("Ticket ID must be a valid UUID"),
];

module.exports = {
  createTicketValidation,
  updateTicketValidation,
  deleteTicketValidation,
};
