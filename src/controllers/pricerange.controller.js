const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPriceRanges = async (req, res) => {
  try {
    const priceRanges = await prisma.priceRange.findMany();
    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve price ranges" });
  }
};

const getPriceRangeById = async (req, res) => {
  try {
    const { id } = req.params;
    const priceRange = await prisma.priceRange.findUnique({
      where: { id },
    });

    if (!priceRange) {
      return res.status(404).json({ error: "Price range not found" });
    }

    res.json(priceRange);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve price range" });
  }
};

const createPriceRange = async (req, res) => {
  try {
    const { range } = req.body;
    const priceRange = await prisma.priceRange.create({
      data: { range },
    });

    res.status(201).json(priceRange);
  } catch (error) {
    res.status(500).json({ error: "Failed to create price range" });
  }
};

const updatePriceRange = async (req, res) => {
  try {
    const { id } = req.params;
    const { range } = req.body;

    const priceRange = await prisma.priceRange.update({
      where: { id },
      data: { range },
    });

    res.json(priceRange);
  } catch (error) {
    res.status(500).json({ error: "Failed to update price range" });
  }
};

const deletePriceRange = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.priceRange.delete({
      where: { id },
    });

    res.json({ message: "Price range deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete price range" });
  }
};

module.exports = {
    getAllPriceRanges,
    getPriceRangeById,
    createPriceRange,
    updatePriceRange,
    deletePriceRange,
}
