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
    body('url')
        .notEmpty()
        .withMessage('URL is required')
        .isURL()
        .withMessage('URL must be a valid URL'),
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