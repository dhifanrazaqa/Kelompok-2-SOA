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
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.get("/", authenticate, authorize(['ADMIN', 'ORGANIZER']), getAllDocuments);
router.get("/:id", authenticate, authorize(['ADMIN', 'ORGANIZER']), getDocumentById);
router.post("/", authenticate, authorize(['ADMIN', 'ORGANIZER']), upload.single('document'),  createDocumentValidation, validate, createDocument);
router.put("/:id", authenticate, authorize(['ADMIN', 'ORGANIZER']), updateDocumentValidation, validate, updateDocument);
router.delete("/:id", authenticate, authorize(['ADMIN', 'ORGANIZER']), deleteDocumentValidation, validate, deleteDocument);

module.exports = router;
