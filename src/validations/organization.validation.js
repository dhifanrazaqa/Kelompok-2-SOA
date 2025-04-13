const { body, param } = require("express-validator");

const createOrganizerValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isUUID()
    .withMessage("Invalid User ID format"),

  body("organizationName")
    .notEmpty()
    .withMessage("Organization Name is required")
    .isString()
    .trim()
    .withMessage("Organization Name must be a string"),

  body("contactName")
    .notEmpty()
    .withMessage("Contact Name is required")
    .isString()
    .trim()
    .withMessage("Contact Name must be a string"),

  body("contactPhone")
    .notEmpty()
    .withMessage("Contact Phone is required")
    .isString()
    .matches(/^\+?[0-9\s-]+$/)
    .withMessage("Invalid phone number format")
    .trim(),

  body("contactEmail")
    .notEmpty()
    .withMessage("Contact Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];

const updateOrganizerValidation = [
  param("id")
    .notEmpty()
    .withMessage("Organizer ID is required")
    .isUUID()
    .withMessage("Invalid Organizer ID format"),

  body("organizationName")
    .optional()
    .isString()
    .trim()
    .withMessage("Organization Name must be a string"),

  body("contactName")
    .optional()
    .isString()
    .trim()
    .withMessage("Contact Name must be a string"),

  body("contactPhone")
    .optional()
    .isString()
    .matches(/^\+?[0-9\s-]+$/)
    .withMessage("Invalid phone number format")
    .trim(),

  body("contactEmail")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];

const deleteOrganizerValidation = [
  param("id")
    .notEmpty()
    .withMessage("Organizer ID is required")
    .isUUID()
    .withMessage("Invalid Organizer ID format"),
];

module.exports = { createOrganizerValidation, updateOrganizerValidation, deleteOrganizerValidation };