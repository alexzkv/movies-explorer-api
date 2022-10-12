const movieRouter = require('express').Router();

const {
  validateCreateMovie, validateDeleteMovie,
} = require('../middlewares/reqValidation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
