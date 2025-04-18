const { body, param } = require('express-validator');

const createChecklistValidation = [
    body('eventId')
        .notEmpty()
        .withMessage('Event ID is required')
        .isUUID()
        .withMessage('Event ID must be a valid UUID'),
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('progress')
        .notEmpty()
        .withMessage('Progress is required')
        .isInt({ min: 0, max: 100 })
        .withMessage('Progress must be an integer between 0 and 100'),
];

const updateChecklistValidation = [
    param('id')
        .notEmpty()
        .withMessage('Checklist ID is required')
        .isUUID()
        .withMessage('Checklist ID must be a valid UUID'),
    body('title')
        .optional()
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('progress')
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage('Progress must be an integer between 0 and 100'),
];

const deleteChecklistValidation = [
    param('id')
        .notEmpty()
        .withMessage('Checklist ID is required')
        .isUUID()
        .withMessage('Checklist ID must be a valid UUID'),
];

module.exports = {
    createChecklistValidation,
    updateChecklistValidation,
    deleteChecklistValidation,
};
