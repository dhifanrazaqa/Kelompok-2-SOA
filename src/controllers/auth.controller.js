const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

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

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, address, role },
    });

    sendSuccess(res, "User created successfully", null);
  } catch (error) {
    console.error(error);
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      sendError(
        res,
        "Login failed",
        [{ field: "credentials", message: "Invalid email or password" }],
        401
      );
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    sendSuccess(res, "Login successful", { token }, 200);
  } catch (error) {
    console.error("Login error:", error);
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
