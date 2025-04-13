const { body } = require("express-validator");

const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isString()
    .matches(/^\+?[0-9\s-]+$/)
    .withMessage("Invalid phone number format")
    .trim(),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string")
    .trim(),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["PARTICIPANT", "ORGANIZER", "ADMIN"])
    .withMessage("Role must be either PARTICIPANT, ORGANIZER, or ADMIN"),
];

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
