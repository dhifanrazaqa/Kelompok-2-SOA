/**
 * Send a standardized success response
 * @param {Object} res - Express response object
 * @param {string} message - Message to be sent
 * @param {any} data - Response content
 * @param {number} [statusCode=200] - HTTP status code
 */
const sendSuccess = (res, message, data, statusCode = 200) => {
  const response = {
    message,
    content: data,
    errors: [],
  };

  res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {Array} [errors=[]] - Array of error details (e.g., { field, message })
 * @param {number} [statusCode=400] - HTTP status code
 */
const sendError = (res, message, errors = [], statusCode = 400) => {
  const response = {
    message,
    content: null,
    errors,
  };

  res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};
