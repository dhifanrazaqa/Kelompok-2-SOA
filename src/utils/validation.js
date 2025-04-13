const { validationResult } = require("express-validator");
const { sendError } = require("./response");

/**
 * Middleware untuk memvalidasi data request
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const validationErrors = errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  sendError(res, "Validation Error", validationErrors, 400);
};

module.exports = { validate };