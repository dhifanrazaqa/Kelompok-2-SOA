const { extractTokenFromHeader, verifyToken } = require("../utils/token");
const { sendError } = require("../utils/response");
const prisma = require("../config/database");

/**
 * Middleware to authenticate a user using JWT token from the Authorization header
 * 
 * @function authenticate
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {void}
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Extract token from Bearer Authorization header
    const token = extractTokenFromHeader(authHeader);

    // If no token provided
    if (!token) {
      sendError(
        res,
        "Authentication required",
        [{ field: "token", message: "No token provided" }],
        401
      );
      return;
    }

    // Verify and decode token
    const payload = verifyToken(token);

    // If token is invalid or expired
    if (!payload) {
      sendError(
        res,
        "Authentication failed",
        [{ field: "token", message: "Invalid or expired token" }],
        401
      );
      return;
    }

    // Retrieve user based on token payload
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    // If user not found in database
    if (!user) {
      sendError(
        res,
        "Authentication failed",
        [{ field: "token", message: "User not found" }],
        401
      );
      return;
    }

    // Attach authenticated user to request object
    req.user = user;

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Auth error:", error);
    sendError(
      res,
      "Authentication error",
      [{ field: "auth", message: "An error occurred during authentication" }],
      500
    );
  }
};

/**
 * Middleware to authorize a user based on their role
 * 
 * @function authorize
 * @param {string[]} allowedRoles - Array of roles allowed to access the route
 * @returns {import("express").RequestHandler}
 */
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      // Check if user exists and has a valid role
      if (!user || !allowedRoles.includes(user.role)) {
        sendError(
          res,
          "Authorization failed",
          [{ field: "role", message: "Access denied" }],
          403
        );
        return;
      }

      // Proceed to next middleware
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      sendError(
        res,
        "Authorization error",
        [{ field: "auth", message: "An error occurred during authorization" }],
        500
      );
    }
  };
};

module.exports = {
  authenticate,
  authorize,
};
