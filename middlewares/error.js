const { messages } = require('../utils/config');

const errorHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? messages.errorOnServer
      : message,
  });
  next();
});

module.exports = errorHandler;
