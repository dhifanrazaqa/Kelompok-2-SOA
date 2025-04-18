const { body, param } = require('express-validator');

/**
 * Middleware untuk validasi input saat membuat order tiket
 *
 * Validasi:
 * - userId, ticketId, eventId, quantity, totalPrice, paymentStatus, orderStatus: wajib
 * - userId, ticketId, eventId: harus UUID
 * - quantity: integer minimal 1
 * - totalPrice: decimal
 * - paymentStatus hanya boleh: PENDING, PAID, FAILED, REFUNDED
 * - orderStatus hanya boleh: NEW, CONFIRMED, CANCELLED
 */
const createOrderTicketValidation = [
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isUUID().withMessage('User ID must be a valid UUID'),
    body('ticketId')
        .notEmpty().withMessage('Ticket ID is required')
        .isUUID().withMessage('Ticket ID must be a valid UUID'),
    body('eventId')
        .notEmpty().withMessage('Event ID is required')
        .isUUID().withMessage('Event ID must be a valid UUID'),
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
    body('totalPrice')
        .notEmpty().withMessage('Total price is required')
        .isDecimal().withMessage('Total price must be a valid decimal number'),
    body('paymentStatus')
        .notEmpty().withMessage('Payment status is required')
        .isIn(['PENDING', 'PAID', 'FAILED', 'REFUNDED'])
        .withMessage('Type must be one of: PENDING, PAID, FAILED, REFUNDED'),
    body('orderStatus')
        .notEmpty().withMessage('Order status is required')
        .isIn(['NEW', 'CONFIRMED', 'CANCELLED'])
        .withMessage('Type must be one of: NEW, CONFIRMED, CANCELLED'),
];

/**
 * Middleware untuk validasi input saat mengupdate order tiket
 *
 * Validasi:
 * - id (param): wajib, UUID
 * - quantity: opsional, integer minimal 1
 * - totalPrice: opsional, decimal
 * - paymentStatus hanya boleh: PENDING, PAID, FAILED, REFUNDED
 * - orderStatus hanya boleh: NEW, CONFIRMED, CANCELLED
 */
const updateOrderTicketValidation = [
    param('id')
        .notEmpty().withMessage('Order ticket ID is required')
        .isUUID().withMessage('Order ticket ID must be a valid UUID'),
    body('quantity')
        .optional()
        .isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
    body('totalPrice')
        .optional()
        .isDecimal().withMessage('Total price must be a valid decimal number'),
    body('paymentStatus')
        .optional()
        .isIn(['PENDING', 'PAID', 'FAILED', 'REFUNDED'])
        .withMessage('Type must be one of: PENDING, PAID, FAILED, REFUNDED'),
    body('orderStatus')
        .optional()
        .isIn(['NEW', 'CONFIRMED', 'CANCELLED'])
        .withMessage('Type must be one of: NEW, CONFIRMED, CANCELLED'),
];

/**
 * Middleware untuk validasi input saat menghapus order tiket
 *
 * Validasi:
 * - id (param): wajib, UUID
 */
const deleteOrderTicketValidation = [
    param('id')
        .notEmpty().withMessage('Order ticket ID is required')
        .isUUID().withMessage('Order ticket ID must be a valid UUID'),
];

module.exports = {
    createOrderTicketValidation,
    updateOrderTicketValidation,
    deleteOrderTicketValidation,
};
