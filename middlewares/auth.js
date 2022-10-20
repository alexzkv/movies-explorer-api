const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET, messages } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError(messages.authorizationError));
  }
  req.user = payload;
  next();
};

module.exports = auth;
