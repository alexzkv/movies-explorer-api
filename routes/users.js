const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = userRouter;
