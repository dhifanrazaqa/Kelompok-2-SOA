const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllFinances = async (req, res) => {
  try {
    const finances = await prisma.finance.findMany({
      include: { priceRange: true, eventType: true },
    });
    sendSuccess(res, "Finances retrieved successfully", finances);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve finances", error, 500);
  }
};

const getFinanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const finance = await prisma.finance.findUnique({
      where: { id },
      include: { priceRange: true, eventType: true },
    });
    if (!finance)
      return sendError(res, "Finance not found", [], 404);
    sendSuccess(res, "Finance retrieved successfully", finance);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to retrieve finance", error, 500);
  }
};

const createFinance = async (req, res) => {
  try {
    const data = req.body;
    const finance = await prisma.finance.create({ data });
    sendSuccess(res, "Finance created successfully", finance);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to create finance", error, 500);
  }
};

const updateFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const finance = await prisma.finance.update({
      where: { id },
      data,
    });
    sendSuccess(res, "Finance updated successfully", finance);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to update finance", error, 500);
  }
};

const deleteFinance = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.finance.delete({ where: { id } });
    sendSuccess(res, "Finance deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(res, "Failed to delete finance", error, 500);
  }
};

module.exports = {
  getAllFinances,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
};
