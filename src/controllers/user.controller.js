const { sendSuccess, sendError } = require("../utils/response");
const prisma = require("../config/database");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        bookings: true,
      },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user)
      return sendError(res, "User not found", [
        { field: "id", message: "User with the provided ID does not exist" },
      ]);

    const { email, password, ...safeUserData } = userData;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: safeUserData,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
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
  updateUser,
  deleteUser,
};
