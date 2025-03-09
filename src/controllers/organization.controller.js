const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve organizations" });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve organization" });
  }
};

const createOrganization = async (req, res) => {
  try {
    const { name, contactPerson, contactPhone, contactEmail } = req.body;
    const organization = await prisma.organization.create({
      data: { name, contactPerson, contactPhone, contactEmail },
    });

    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: "Failed to create organization" });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactPerson, contactPhone, contactEmail } = req.body;

    const organization = await prisma.organization.update({
      where: { id },
      data: { name, contactPerson, contactPhone, contactEmail },
    });

    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: "Failed to update organization" });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.organization.delete({
      where: { id },
    });

    res.json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete organization" });
  }
};

module.exports = {
    getAllOrganizations,
    getOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization,
};