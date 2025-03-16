const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPriceRanges = async (req, res) => {
  try {
    const priceRanges = await prisma.priceRange.findMany();
    sendSuccess(res, "Price Ranges retrieved successfully", priceRanges);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve price ranges",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the price ranges",
        },
      ],
      500
    );
  }
};

const getPriceRangeById = async (req, res) => {
  try {
    const { id } = req.params;
    const priceRange = await prisma.priceRange.findUnique({
      where: { id },
    });

    if (!priceRange) {
      return sendError(res, "Price range not found", [
        {
          field: "id",
          message: "Price range with the provided ID does not exist",
        },
      ]);
    }

    sendSuccess(res, "Price range retrieved successfully", priceRange);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve price range",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the price range",
        },
      ],
      500
    );
  }
};

const createPriceRange = async (req, res) => {
  try {
    const { range } = req.body;
    const priceRange = await prisma.priceRange.create({
      data: { range },
    });

    sendSuccess(res, "Price range created successfully", priceRange);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve price range",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the price range",
        },
      ],
      500
    );
  }
};

const updatePriceRange = async (req, res) => {
  try {
    const { id } = req.params;
    const { range } = req.body;

    const existingPrice = await prisma.priceRange.findUnique({
      where: { id },
    });

    if (!existingPrice)
      return sendError(res, "Price range not found", [
        {
          field: "id",
          message: "Price range with the provided ID does not exist",
        },
      ]);

    const priceRange = await prisma.priceRange.update({
      where: { id },
      data: { range },
    });

    sendSuccess(res, "Price range updated successfully", priceRange);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to update price range",
      [
        {
          field: "server",
          message: "An error occurred while updating the price range",
        },
      ],
      500
    );
  }
};

const deletePriceRange = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPrice = await prisma.priceRange.findUnique({
      where: { id },
    });

    if (!existingPrice)
      return sendError(res, "Price range not found", [
        {
          field: "id",
          message: "Price range with the provided ID does not exist",
        },
      ]);

    await prisma.priceRange.delete({
      where: { id },
    });

    sendSuccess(res, "Price range deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to delete price range",
      [
        {
          field: "server",
          message: "An error occurred while deleting the price range",
        },
      ],
      500
    );
  }
};

module.exports = {
  getAllPriceRanges,
  getPriceRangeById,
  createPriceRange,
  updatePriceRange,
  deletePriceRange,
};
