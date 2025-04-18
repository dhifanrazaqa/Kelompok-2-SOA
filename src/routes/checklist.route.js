const express = require("express");
const {
  getAllChecklists,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} = require("../controllers/checklist.controller");
const {
  createChecklistValidation,
  updateChecklistValidation,
  deleteChecklistValidation,
} = require("../validations/checklist.validation");
const { validate } = require("../utils/validation");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, authorize(['ADMIN', 'ORGANIZER']), getAllChecklists);
router.get("/:id", authenticate, getChecklistById);
router.post("/", authenticate, createChecklistValidation, validate, createChecklist);
router.put("/:id", authenticate, updateChecklistValidation, validate, updateChecklist);
router.delete("/:id", authenticate, deleteChecklistValidation, validate, deleteChecklist);

module.exports = router;
