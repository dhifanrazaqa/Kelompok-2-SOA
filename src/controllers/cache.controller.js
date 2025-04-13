const { sendSuccess, sendError } = require("../utils/response");
const { hashPassword } = require("../utils/password");
const prisma = require("../config/database");
const redis = require("../config/redis");

const registerUserCache = async (req, res) => {
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

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, address, role },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        organizer: true,
      },
    });

    const cacheKey = `user:${user.id}`;
    await redis.set(cacheKey, JSON.stringify(user), "EX", 3600);

    sendSuccess(res, "User created successfully", user);
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

const getUserByIdCache = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `user:${id}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const user = JSON.parse(cachedData);
      return sendSuccess(res, "User retrieved successfully from cache", user);
    }

    sendError(
      res,
      "Cache not found",
      [{ field: "cache", message: "No cached data available for this" }],
      404
    );
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user from cache",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user from cache",
        },
      ],
      500
    );
  }
};

const deleteUserCache = async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `user:${id}`;

    const cachedData = await redis.get(cacheKey);

    if (!cachedData) {
      return sendError(
        res,
        "Cache not found",
        [{ field: "cache", message: "No cached data available for this" }],
        404
      );
    }

    await redis.del(cacheKey);

    sendSuccess(res, "User deleted successfully from cache", null);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to delete user from cache",
      [
        {
          field: "server",
          message: "An error occurred while deleting the user from cache",
        },
      ],
      500
    );
  }
};

module.exports = {
  registerUserCache,
  getUserByIdCache,
  deleteUserCache,
};
