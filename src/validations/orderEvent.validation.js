const { body, param } = require("express-validator");

const createOrderEventValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isUUID()
    .withMessage("User ID must be a valid UUID"),
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required")
    .isUUID()
    .withMessage("Event ID must be a valid UUID"),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("totalPrice")
    .notEmpty()
    .withMessage("Total price is required")
    .isDecimal()
    .withMessage("Total price must be a decimal value"),
  body("paymentStatus")
    .notEmpty()
    .withMessage("Payment status is required")
    .isIn(["PENDING", "COMPLETED", "FAILED"])
    .withMessage("Payment status must be one of PENDING, COMPLETED, or FAILED"),
  body("orderStatus")
    .notEmpty()
    .withMessage("Order status is required")
    .isIn(["PENDING", "CONFIRMED", "CANCELLED"])
    .withMessage("Order status must be one of PENDING, CONFIRMED, or CANCELLED"),
];

const updateOrderEventValidation = [
  param("id")
    .notEmpty()
    .withMessage("Order event ID is required")
    .isUUID()
    .withMessage("Order event ID must be a valid UUID"),
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("totalPrice")
    .optional()
    .isDecimal()
    .withMessage("Total price must be a decimal value"),
  body("paymentStatus")
    .optional()
    .isIn(["PENDING", "COMPLETED", "FAILED"])
    .withMessage("Payment status must be one of PENDING, COMPLETED, or FAILED"),
  body("orderStatus")
    .optional()
    .isIn(["PENDING", "CONFIRMED", "CANCELLED"])
    .withMessage("Order status must be one of PENDING, CONFIRMED, or CANCELLED"),
];

const deleteOrderEventValidation = [
  param("id")
    .notEmpty()
    .withMessage("Order event ID is required")
    .isUUID()
    .withMessage("Order event ID must be a valid UUID"),
];

module.exports = {
  createOrderEventValidation,
  updateOrderEventValidation,
  deleteOrderEventValidation,
};
