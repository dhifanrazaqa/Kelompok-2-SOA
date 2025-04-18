const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");

/**
 * Middleware untuk menangani proses registrasi pengguna baru
 * @param {Request} req - Express request, berisi data pengguna dari body (name, email, password, phone, address, role)
 * @param {Response} res - Express response, digunakan untuk mengirim respons sukses atau error
 * @returns {void}
 */
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

/**
 * Middleware untuk menangani proses login pengguna
 * @param {Request} req - Express request, berisi data login (email dan password)
 * @param {Response} res - Express response, digunakan untuk mengirim token jika login berhasil atau error jika gagal
 * @returns {void}
 */
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

/**
 * @module AuthController
 * @description Berisi handler untuk autentikasi seperti register dan login
 * @exports register
 * @exports login
 */
module.exports = {
  register,
  login,
};
