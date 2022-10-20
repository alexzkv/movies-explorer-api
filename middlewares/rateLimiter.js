const rateLimit = require('express-rate-limit');

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

module.exports = limit;
