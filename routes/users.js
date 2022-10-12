const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo,
  updateUserInfo,
  logout,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

userRouter.delete('/logout', logout);

module.exports = userRouter;
