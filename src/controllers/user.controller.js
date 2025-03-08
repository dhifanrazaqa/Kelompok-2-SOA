const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password, isAdmin },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email, password, isAdmin },
    });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
