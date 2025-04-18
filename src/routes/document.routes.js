const express = require("express");
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/document.controller");
const {
  createDocumentValidation,
  updateDocumentValidation,
  deleteDocumentValidation,
} = require("../validations/document.validaton");
const { validate } = require("../utils/validation");
const { authenticate } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.get("/", authenticate, getAllDocuments);
router.get("/:id", authenticate, getDocumentById);
router.post("/", authenticate, upload.single('image'),  createDocumentValidation, validate, createDocument);
router.put("/:id", authenticate, updateDocumentValidation, validate, updateDocument);
router.delete("/:id", authenticate, deleteDocumentValidation, validate, deleteDocument);

module.exports = router;
