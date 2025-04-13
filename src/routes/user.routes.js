const express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserTickets,
  getUserOrganizer,
  getUserOrderTickets,
  getUserOrderEvents,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  updateUserValidation,
  deleteUserValidation,
} = require("../validations/user.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

// Complex API
router.get("/:id/tickets", getUserTickets)
router.get("/:id/organizer", getUserOrganizer)
router.get("/:id/order/tickets", getUserOrderTickets)
router.get("/:id/order/events", getUserOrderEvents)

/// Simple API CRUD
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUserValidation, validate, updateUser);
router.delete("/:id", authenticate, deleteUserValidation, validate, deleteUser);

module.exports = router;
