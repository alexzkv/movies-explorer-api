const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

const { signUp, signIn } = require('../controllers/users');
const { messages } = require('../utils/config');

const auth = require('../middlewares/auth');
const {
  validateSignUp, validateSignIn,
} = require('../middlewares/reqValidation');

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(messages.pageNotFound));
});

module.exports = router;
