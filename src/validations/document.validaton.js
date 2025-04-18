const { body, param } = require('express-validator');

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
    body('image')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Image file is required');
            }
            if (req.file.size > 5 * 1024 * 1024) {
                throw new Error('Image file size must not exceed 5MB');
            }
            return true;
        }),
];

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