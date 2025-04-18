/**
 * Middleware untuk menginisialisasi dan mengekspor instance Prisma Client
 * @module prisma
 * @requires @prisma/client
 * 
 * @const {PrismaClient} PrismaClient - Kelas dari Prisma untuk koneksi database
 * @type {PrismaClient} prisma - Instance Prisma Client yang digunakan untuk query database
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;