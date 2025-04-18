const { validationResult } = require("express-validator");
const { sendError } = require("./response");

/**
 * Middleware untuk memvalidasi data request.
 * Memeriksa apakah terdapat error validasi yang dihasilkan oleh express-validator,
 * dan jika ada, mengembalikan respons error dengan status 400.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
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
