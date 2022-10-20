const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');

const { signUp, signIn } = require('../controllers/users');
const { messages } = require('../utils/config');

const auth = require('../middlewares/auth');
const {
  validateSignUp, validateSignIn,
} = require('../middlewares/reqValidation');

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError(messages.pageNotFound));
});

module.exports = router;
