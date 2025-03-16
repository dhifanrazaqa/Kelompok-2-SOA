const prisma = require("../config/database");
const { sendSuccess, sendError } = require("../utils/response");

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany();
    sendSuccess(res, "Organizations retrieved successfully", organizations);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve organizations",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the organizations",
        },
      ],
      500
    );
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);
    }

    sendSuccess(res, "Organization retrieved successfully", organization);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve organization",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the organization",
        },
      ],
      500
    );
  }
};

const createOrganization = async (req, res) => {
  try {
    const orgData = req.body;

    const organization = await prisma.organization.create({
      data: orgData,
    });

    sendSuccess(res, "Organization created successfully", organization);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to retrieve organization",
      [
        {
          field: "server",
          message: "An error occurred while retrieving the organization",
        },
      ],
      500
    );
  }
};

const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const orgData = req.body;

    const existingOrg = await prisma.organization.findUnique({
      where: { id },
    });

    if (!existingOrg)
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);

    const updatedOrg = await prisma.organization.update({
      where: { id },
      data: orgData,
    });

    sendSuccess(res, "Organization updated successfully", updatedOrg);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to update organization",
      [
        {
          field: "server",
          message: "An error occurred while updating the organizaiton",
        },
      ],
      500
    );
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const existingOrg = await prisma.organization.findUnique({
      where: { id },
    });

    if (!existingOrg)
      return sendError(res, "Organization not found", [
        {
          field: "id",
          message: "Organization with the provided ID does not exist",
        },
      ]);

    await prisma.organization.delete({
      where: { id },
    });

    sendSuccess(res, "Organization deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendError(
      res,
      "Failed to delete organization",
      [
        {
          field: "server",
          message: "An error occurred while deleting the organization",
        },
      ],
      500
    );
  }
};

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
