const { body, param } = require("express-validator");

/**
 * Middleware untuk validasi input saat mengupdate data pengguna
 *
 * Validasi:
 * - id (param): wajib, UUID
 * - name: opsional, string minimal 3 karakter
 * - phone: opsional, string dengan format nomor telepon
 * - address: opsional, string
 * - role: opsional, harus salah satu dari PARTICIPANT, ORGANIZER, ADMIN
 */
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

/**
 * Middleware untuk validasi input saat menghapus data pengguna
 *
 * Validasi:
 * - id (param): wajib, UUID
 */
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
