const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Rate limiting: max 100 requests per 15 minutes per IP
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
});

// Throttling: delay 500ms per request setelah 50 request
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 500,
});

module.exports = {
  rateLimiter,
  speedLimiter,
};