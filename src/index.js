const express = require("express");
const routes = require("./routes");
const { sendError } = require("./utils/response")

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use((req, res) => {
  sendError(
    res,
    "Not Found",
    [{ field: "url", message: `Route ${req.originalUrl} not found` }],
    404
  );
});

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
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
