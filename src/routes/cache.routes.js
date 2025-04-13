const express = require("express");
const {
  registerUserCache,
  getUserByIdCache,
  deleteUserCache
} = require("../controllers/cache.controller");
const { registerValidation } = require("../validations/auth.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

router.post("/user", registerValidation, validate, registerUserCache);
router.get("/user/:id", getUserByIdCache);
router.delete("/user/:id", deleteUserCache);

// router.post("/event", getUserByIdCache);
// router.get("/events", getUserByIdCache);
// router.get("/event/:id", getUserByIdCache);
// router.get("/event/:id/venue", getUserByIdCache);
// router.get("/event/popular", getUserByIdCache);
// router.get("/event/:id/tickets", getUserByIdCache);
// router.delete("/event/:id", getUserByIdCache);

// router.get("/organizer/:id", getUserByIdCache);
// router.get("/organizer/:id/top-event", getUserByIdCache);

module.exports = router;
