const express = require("express");
const routes = require("./routes");
const { sendError } = require("./utils/response");
const { swaggerUi, specs } = require('../swagger');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());

app.use(cors());

/**
 * Middleware untuk parsing request body sebagai JSON.
 */
app.use(express.json());

/**
 * Middleware untuk dokumentasi Swagger di endpoint /api-docs.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * Menggunakan route utama aplikasi di prefix /api.
 */
app.use("/api", routes);

/**
 * Middleware untuk menangani rute yang tidak ditemukan (404 Not Found).
 */
app.use((req, res) => {
  sendError(
    res,
    "Not Found",
    [{ field: "url", message: `Route ${req.originalUrl} not found` }],
    404
  );
});

/**
 * Middleware untuk menangani error tidak terduga di server.
 */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  const errors = [
    {
      field: "server",
      message:
        process.env.ENVIRONMENT === "production"
          ? "An unexpected error occurred"
          : err.message || "Unknown error",
    },
  ];

  sendError(res, "Server Error", errors, 500);
});

const PORT = process.env.PORT || 5000;

/**
 * Menjalankan server Express pada port yang ditentukan.
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
