const { body, param } = require("express-validator");

const createVenueValidation = [
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
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),
  body("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer"),
  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isDecimal()
    .withMessage("Latitude must be a decimal number"),
  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isDecimal()
    .withMessage("Longitude must be a decimal number"),
];

const updateVenueValidation = [
  param("id")
    .notEmpty()
    .withMessage("Venue ID is required")
    .isUUID()
    .withMessage("Venue ID must be a valid UUID"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("city").optional().isString().withMessage("City must be a string"),
  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer"),
  body("latitude")
    .optional()
    .isDecimal()
    .withMessage("Latitude must be a decimal number"),
  body("longitude")
    .optional()
    .isDecimal()
    .withMessage("Longitude must be a decimal number"),
];

const deleteVenueValidation = [
  param("id")
    .notEmpty()
    .withMessage("Venue ID is required")
    .isUUID()
    .withMessage("Venue ID must be a valid UUID"),
];

module.exports = {
  createVenueValidation,
  updateVenueValidation,
  deleteVenueValidation,
};
