/**
 * Konfigurasi Swagger untuk dokumentasi API menggunakan swagger-jsdoc dan swagger-ui-express.
 */

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Opsi untuk menghasilkan spesifikasi Swagger.
 * - `definition`: Informasi dasar dari API.
 * - `apis`: Lokasi file-file yang berisi dokumentasi endpoint menggunakan JSDoc.
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Organizer API",
      version: "1.0.0",
      description: "Event Organizer API with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL base server
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path ke file yang berisi dokumentasi Swagger JSDoc
};

/**
 * Menghasilkan spesifikasi Swagger berdasarkan opsi di atas.
 */
const specs = swaggerJsDoc(options);

/**
 * Ekspor objek swaggerUi dan specs untuk digunakan dalam Express.
 */
module.exports = { swaggerUi, specs };
