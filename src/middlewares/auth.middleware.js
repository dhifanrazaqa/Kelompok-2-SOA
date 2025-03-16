const { extractTokenFromHeader, verifyToken } = require("../utils/token");
const { sendError } = require("../utils/response");
const prisma = require("../config/database");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      sendError(
        res,
        "Authentication required",
        [{ field: "token", message: "No token provided" }],
        401
      );
      return;
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      sendError(
        res,
        "Authentication failed",
        [{ field: "token", message: "Invalid or expired token" }],
        401
      );
      return;
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      sendError(
        res,
        "Authentication failed",
        [{ field: "token", message: "User not found" }],
        401
      );
      return;
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    sendError(
      res,
      "Authentication error",
      [{ field: "auth", message: "An error occurred during authentication" }],
      500
    );
  }
};

module.exports = {
  authenticate,
};
