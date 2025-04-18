/**
 * Module to initialize and export an instance of Prisma Client
 * @module prisma
 * 
 * @return {PrismaClient} prisma - Prisma Client instance used for database queries
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;