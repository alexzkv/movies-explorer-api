const userRouter = require('express').Router();

const { validateUpdate } = require('../middlewares/reqValidation');

const {
  getUserInfo, updateUserInfo, logout,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUpdate, updateUserInfo);
userRouter.delete('/logout', logout);

module.exports = userRouter;
