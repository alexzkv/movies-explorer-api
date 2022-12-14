const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const AuthError = require('../errors/AuthError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictRequestError = require('../errors/ConflictRequestError');
const NotFoundError = require('../errors/NotFoundError');

const {
  NODE_ENV, JWT_SECRET, messages,
} = require('../utils/config');

const signUp = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.incorrectData));
      } if (err.code === 11000) {
        next(new ConflictRequestError(messages.emailAlreadyRegistered));
      } else {
        next(err);
      }
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(messages.incorrectCredentials);
      }

      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (!isUserValid) {
            throw new AuthError(messages.incorrectCredentials);
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: '3600000',
            httpOnly: true,
            SameSite: 'none',
            Secure: true,
          }).send({ data: user.toJSON() });
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.userNotFound);
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.userNotFound);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.incorrectData));
      } if (err.code === 11000) {
        next(new ConflictRequestError(messages.emailAlreadyRegistered));
      } else {
        next(err);
      }
    });
};

const signout = (req, res) => {
  res.clearCookie('jwt').send({
    message: '???????????????????????? ??????????',
  });
};

module.exports = {
  signUp,
  signIn,
  getUserInfo,
  updateUserInfo,
  signout,
};
