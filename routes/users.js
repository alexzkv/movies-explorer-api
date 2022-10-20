const userRouter = require('express').Router();

const { validateUpdate } = require('../middlewares/reqValidation');

const {
  getUserInfo, updateUserInfo, signout,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUpdate, updateUserInfo);
userRouter.delete('/signout', signout);

module.exports = userRouter;
