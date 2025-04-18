const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");
const { validate } = require("../utils/validation");

const router = express.Router();

/// Simple API CRUD
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

module.exports = router;
