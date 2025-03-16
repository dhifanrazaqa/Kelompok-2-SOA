const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3d", // Token expires in 3 days
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message); // Log for debugging
    return null;
  }
};

const extractTokenFromHeader = (authHeader) => {
  return authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader,
};
