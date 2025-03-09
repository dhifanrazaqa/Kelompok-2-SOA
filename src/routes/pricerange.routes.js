const express = require("express");

const {
    getAllPriceRanges,
    getPriceRangeById,
    createPriceRange,
    updatePriceRange,
    deletePriceRange,
} = require("../controllers/pricerange.controller");

const router = express.Router();

router.get("/", getAllPriceRanges);
router.get("/:id", getPriceRangeById);
router.post("/", createPriceRange);
router.put("/:id", updatePriceRange);
router.delete("/:id", deletePriceRange);

module.exports = router;
