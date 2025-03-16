const express = require("express");
const {
  getAllEventPackages,
  getEventPackageById,
  createEventPackage,
  updateEventPackage,
  deleteEventPackage,
} = require("../controllers/eventPackage.controller");

const router = express.Router();

router.get("/", getAllEventPackages);
router.get("/:id", getEventPackageById);
router.post("/", createEventPackage);
router.put("/:id", updateEventPackage);
router.delete("/:id", deleteEventPackage);

module.exports = router;
