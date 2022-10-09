const express = require('express');

const router = express.Router();

const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const movieRouter = require('./movies');

const { signIn, signUp } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), signUp);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signIn);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
