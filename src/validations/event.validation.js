const { body, param } = require("express-validator");

const createEventValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isString()
    .withMessage("Type must be a string")
    .isIn(["KONSER", "PARTY", "SEMINAR", "LAINNYA"])
    .withMessage("Type must be one of: KONSER, PARTY, SEMINAR, LAINNYA"),
  body("target")
    .notEmpty()
    .withMessage("Target is required")
    .isString()
    .withMessage("Target must be a string")
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage("Target must be one of: PRIVATE, PUBLIC"),
  body("budgetRange")
    .notEmpty()
    .withMessage("Budget range is required")
    .isString()
    .withMessage("Budget range must be a string")
    .isIn(["FIVE_TO_TEN", "TEN_TO_TWENTY", "TWENTY_TO_THIRTYFIVE", "TENTATIVE"])
    .withMessage(
      "Budget range must be one of: FIVE_TO_TEN, TEN_TO_TWENTY, TWENTY_TO_THIRTYFIVE, TENTATIVE"
    ),
  body("organizerId")
    .notEmpty()
    .withMessage("Organizer ID is required")
    .isString()
    .withMessage("Organizer ID must be a string"),
  body("thumbnail")
    .optional()
    .isString()
    .withMessage("Thumbnail must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date"),
  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date"),
  body("picName")
    .optional()
    .isString()
    .withMessage("PIC Name must be a string"),
  body("picPhone")
    .optional()
    .isString()
    .withMessage("PIC Phone must be a string"),
  body("picEmail")
    .optional()
    .isEmail()
    .withMessage("PIC Email must be a valid email"),
  body("status")
    .optional()
    .isString()
    .withMessage("Status must be a string")
    .isIn(["CONCEPTING", "PRODUCTION", "TICKETING", "ONGOING"])
    .withMessage(
      "Status must be one of: CONCEPTING, PRODUCTION, TICKETING, ONGOING"
    ),
];

const updateEventValidation = [
  param("id")
    .notEmpty()
    .withMessage("Event ID is required")
    .isUUID()
    .withMessage("Invalid Event ID format"),
  body("title").optional().isString().withMessage("Title must be a string"),
  body("type")
    .optional()
    .isString()
    .withMessage("Type must be a string")
    .isIn(["KONSER", "PARTY", "SEMINAR", "LAINNYA"])
    .withMessage("Type must be one of: KONSER, PARTY, SEMINAR, LAINNYA"),
  body("target")
    .optional()
    .isString()
    .withMessage("Target must be a string")
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage("Target must be one of: PRIVATE, PUBLIC"),
  body("budgetRange")
    .optional()
    .isString()
    .withMessage("Budget range must be a string")
    .isIn(["FIVE_TO_TEN", "TEN_TO_TWENTY", "TWENTY_TO_THIRTYFIVE", "TENTATIVE"])
    .withMessage(
      "Budget range must be one of: FIVE_TO_TEN, TEN_TO_TWENTY, TWENTY_TO_THIRTYFIVE, TENTATIVE"
    ),
  body("thumbnail")
    .optional()
    .isString()
    .withMessage("Thumbnail must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date"),
  body("picName")
    .optional()
    .isString()
    .withMessage("PIC Name must be a string"),
  body("picPhone")
    .optional()
    .isString()
    .withMessage("PIC Phone must be a string"),
  body("picEmail")
    .optional()
    .isEmail()
    .withMessage("PIC Email must be a valid email"),
  body("status")
    .optional()
    .isString()
    .withMessage("Status must be a string")
    .isIn(["CONCEPTING", "PRODUCTION", "TICKETING", "ONGOING"])
    .withMessage(
      "Status must be one of: CONCEPTING, PRODUCTION, TICKETING, ONGOING"
    ),
];

const deleteEventValidation = [
  param("id")
    .notEmpty()
    .withMessage("Event ID is required")
    .isUUID()
    .withMessage("Invalid Event ID format"),
];

module.exports = {
  createEventValidation,
  updateEventValidation,
  deleteEventValidation,
};
