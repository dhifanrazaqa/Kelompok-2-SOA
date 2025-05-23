const { body, param } = require("express-validator");

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
