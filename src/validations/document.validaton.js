const { body, param } = require('express-validator');

/**
 * Middleware untuk validasi input saat membuat dokumen
 *
 * Validasi:
 * - `eventId`: wajib diisi, harus berupa UUID
 * - `name`: wajib diisi, harus berupa string
 * - `url`: wajib diisi, harus berupa URL yang valid
 */
const createDocumentValidation = [
    body('eventId')
        .notEmpty()
        .withMessage('Event ID is required')
        .isUUID()
        .withMessage('Event ID must be a valid UUID'),
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    body('url')
        .notEmpty()
        .withMessage('URL is required')
        .isURL()
        .withMessage('URL must be a valid URL'),
];

/**
 * Middleware untuk validasi input saat mengubah dokumen
 *
 * Validasi:
 * - `id`: wajib diisi, harus berupa UUID (dari URL param)
 * - `name`: opsional, jika diisi harus berupa string
 * - `url`: opsional, jika diisi harus berupa URL yang valid
 */
const updateDocumentValidation = [
    param('id')
        .notEmpty()
        .withMessage('Document ID is required')
        .isUUID()
        .withMessage('Document ID must be a valid UUID'),
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'),
    body('url')
        .optional()
        .isURL()
        .withMessage('URL must be a valid URL'),
];

/**
 * Middleware untuk validasi input saat menghapus dokumen
 *
 * Validasi:
 * - `id`: wajib diisi, harus berupa UUID (dari URL param)
 */
const deleteDocumentValidation = [
    param('id')
        .notEmpty()
        .withMessage('Document ID is required')
        .isUUID()
        .withMessage('Document ID must be a valid UUID'),
];

module.exports = {
    createDocumentValidation,
    updateDocumentValidation,
    deleteDocumentValidation,
};
