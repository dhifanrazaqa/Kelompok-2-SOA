const { body, param } = require("express-validator");

const updateUserValidation = [
    param("id")
        .notEmpty()
        .withMessage("User ID is required")
        .isUUID()
        .withMessage("Invalid User ID format"),
    
    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
    
    body("phone")
        .optional()
        .isString()
        .matches(/^\+?[0-9\s-]+$/)
        .withMessage("Invalid phone number format")
        .trim(),

    body("address")
        .optional()
        .isString()
        .withMessage("Address must be a string")
        .trim(),

    body("role")
        .optional()
        .isIn(["PARTICIPANT", "ORGANIZER", "ADMIN"])
        .withMessage("Role must be either PARTICIPANT, ORGANIZER, or ADMIN"),
];

const deleteUserValidation = [
    param("id")
        .notEmpty()
        .withMessage("User ID is required")
        .isUUID()
        .withMessage("Invalid User ID format"),
];

module.exports = {
    updateUserValidation,
    deleteUserValidation,
};