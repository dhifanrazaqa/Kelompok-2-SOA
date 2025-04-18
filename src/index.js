const express = require("express");
const routes = require("./routes");
const { sendError } = require("./utils/response");
const { swaggerUi, specs } = require("../swagger");
const helmet = require("helmet");
const cors = require("cors");
const {
  rateLimiter,
  speedLimiter,
} = require("./middlewares/limiter.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");
const logger = require("./config/logger");

const app = express();

// Use Helmet for security headers
app.use(helmet());
// Use CORS for cross-origin resource sharing
app.use(cors());
// Logging middleware for HTTP requests
app.use(loggerMiddleware);
// Middleware for parsing json request bodies
app.use(express.json());
// Middleware for swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Setup rate limiting and speed limiting middleware for API routes
app.use("/api", speedLimiter, rateLimiter, routes);
// Middleware for handling 404 errors (not found)
app.use((req, res) => {
  sendError(
    res,
    "Not Found",
    [{ field: "url", message: `Route ${req.originalUrl} not found` }],
    404
  );
});
// Middleware for handling unhandled errors
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", err);

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
// Start the server and listen on the specified port
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
