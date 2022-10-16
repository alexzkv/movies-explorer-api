const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const { messages } = require('../utils/config');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => Movie.populate(movie, { path: 'owner' }))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messages.incorrectData);
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.movieNotFound);
      }

      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(messages.forbiddenDelete);
      }
      Movie.findByIdAndDelete(req.params._id)
        .then((deletedMovie) => res.send({ data: deletedMovie }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError(messages.incorrectData));
          }
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.incorrectData));
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
