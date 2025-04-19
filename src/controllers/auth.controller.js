const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");
const logger = require("../config/logger");

/**
 * Function to handle the registration process for new users
 * @body {string} name - User's name
 * @body {string} email - User's email
 * @body {string} password - User's password
 * @body {string} phone - User's phone number
 * @body {string} address - User's address
 * @body {string} role - User's role
 */
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      sendError(
        res,
        "Registration failed",
        [{ field: "email", message: "Email already in use" }],
        400
      );
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user in the database
    await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, address, role },
    });

    sendSuccess(res, "User created successfully", null, 201);
  } catch (error) {
    logger.error(error);
    sendError(
      res,
      "Failed to create user",
      [
        {
          field: "server",
          message: "An error occurred while creating user",
        },
      ],
      500
    );
  }
};

/**
 * Function to handle the login process for users
 * @body {string} email - User's email
 * @body {string} password - User's password
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Validate Password
    if (!user || !(await verifyPassword(password, user.password))) {
      sendError(
        res,
        "Login failed",
        [{ field: "credentials", message: "Invalid email or password" }],
        401
      );
      return;
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    sendSuccess(res, "Login successful", { token }, 200);
  } catch (error) {
    logger.error("Login error:", error);
    sendError(
      res,
      "Login failed",
      [{ field: "server", message: "An error occurred during login" }],
      500
    );
  }
};

module.exports = {
  register,
  login,
};
