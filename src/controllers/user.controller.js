const { sendSuccess, sendError } = require("../utils/response");
const prisma = require("../config/database");
const redis = require("../config/redis");
const { paymentStatus, orderStatus } = require("@prisma/client");

/**
 * Retrieve all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
      },
    });
    sendSuccess(res, "Users retrieved successfully", users);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user",
        },
      ],
      500
    );
  }
};

/**
 * Get user by ID
 * @param {string} req.params.id - User ID
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `user:${id}`;

    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    await redis.set(cacheKey, JSON.stringify(user), 'EX', 60);

    sendSuccess(res, "User retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user",
        },
      ],
      500
    );
  }
};

/**
 * Get tickets purchased by user (only confirmed & paid)
 * @param {string} req.params.id - User ID
 */
const getUserTickets = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        OrderTicker: {
          where: {
            paymentStatus: paymentStatus.PAID,
            orderStatus: orderStatus.CONFIRMED,
          },
          select: {
            id: true,
            event: {
              select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                thumbnail: true,
              },
            },
            quantity: true,
            totalPrice: true,
          },
        },
      },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    sendSuccess(res, "User with tickets retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user with tickets",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user with tickets",
        },
      ],
      500
    );
  }
};

/**
 * Get organizer profile associated with user
 * @param {string} req.params.id - User ID
 */
const getUserOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        organizer: {
          select: {
            id: true,
            organizationName: true,
            contactName: true,
            contactPhone: true,
            contactEmail: true,
          },
        },
      },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    sendSuccess(res, "User with organizer retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user with organizer",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user with organizer",
        },
      ],
      500
    );
  }
};

/**
 * Get all order tickets (any status) by user
 * @param {string} req.params.id - User ID
 */
const getUserOrderTickets = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        OrderTicker: {
          select: {
            id: true,
            event: {
              select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                thumbnail: true,
              },
            },
            quantity: true,
            totalPrice: true,
            paymentStatus: true,
            orderStatus: true,
          },
        },
      },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    sendSuccess(res, "User with orders retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user with orders",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user with orders",
        },
      ],
      500
    );
  }
};

/**
 * Get all order events by user
 * @param {string} req.params.id - User ID
 */
const getUserOrderEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        OrderEvent: {
          select: {
            id: true,
            event: {
              select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                thumbnail: true,
              },
            },
            totalPrice: true,
            paymentStatus: true,
            orderStatus: true,
          },
        },
      },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    sendSuccess(res, "User with orders retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve user with orders",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the user with orders",
        },
      ],
      500
    );
  }
};

/**
 * Function to update an existing user's details
 * @param {string} req.params.id - ID of the user to update
 * @body {string} name - Updated name of the user
 * @body {string} phone - Updated phone number of the user
 * @body {string} address - Updated address of the user
 * @body {string} role - Updated role of the user
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, role } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone,
        address,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
      },
    });

    sendSuccess(res, "User updated successfully", updatedUser);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to update user",
      [
        {
          field: "server",
          message: "An error occurred while updating the user",
        },
      ],
      500
    );
  }
};

/**
 * Delete user by ID
 * @param {string} req.params.id - User ID
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    await prisma.user.delete({
      where: { id },
    });

    sendSuccess(res, "User deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to delete user",
      [
        {
          field: "server",
          message: "An error occurred while deleting the user",
        },
      ],
      500
    );
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserTickets,
  getUserOrganizer,
  getUserOrderTickets,
  getUserOrderEvents,
  updateUser,
  deleteUser,
};
