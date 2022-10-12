const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { regex } = require('../utils/regex');

movieRouter.get('/', getMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regex.url, 'URL'),
    trailerLink: Joi.string().required().regex(regex.url, 'URL'),
    thumbnail: Joi.string().required().regex(regex.url, 'URL'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

movieRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.number().required(),
  }),
}), deleteMovie);

module.exports = movieRouter;
