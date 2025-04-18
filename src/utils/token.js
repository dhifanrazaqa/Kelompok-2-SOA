const jwt = require("jsonwebtoken");
const logger = require("../config/logger");

/**
 * Generate a JWT token
 * @param {Object} payload - Payload to encode into the token (e.g., user ID)
 * @returns {string} - Signed JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30m", // Token expires in 3 minute
  });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} - Decoded payload if valid, otherwise null
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    logger.error("Token verification failed:", error.message); // Log for debugging
    return null;
  }
};

/**
 * Extract token string from Authorization header
 * @param {string} authHeader - Authorization header value (e.g., "Bearer <token>")
 * @returns {string|null} - Extracted token string or null if invalid
 */
const extractTokenFromHeader = (authHeader) => {
  return authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader,
};
