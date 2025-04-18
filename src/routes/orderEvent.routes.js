const express = require("express");
const {
  getAllOrderEvents,
  getOrderEventById,
  createOrderEvent,
  updateOrderEvent,
  deleteOrderEvent,
} = require("../controllers/orderEvent.controller");
const {
  createOrderEventValidation,
  updateOrderEventValidation,
  deleteOrderEventValidation,
} = require("../validations/orderEvent.validation");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getAllOrderEvents);
router.get("/:id", authenticate, getOrderEventById);
router.post(
  "/",
  authenticate,
  createOrderEventValidation,
  validate,
  createOrderEvent
);
router.put(
  "/:id",
  authenticate,
  updateOrderEventValidation,
  validate,
  updateOrderEvent
);
router.delete(
  "/:id",
  authenticate,
  deleteOrderEventValidation,
  validate,
  deleteOrderEvent
);

module.exports = router;
