require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  DATA_BASE = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET,
} = process.env;

const messages = {
  incorrectData: 'Введены некорректные данные',
  incorrectCredentials: 'Неправильные почта или пароль',
  emailAlreadyRegistered: 'Пользователь с таким email уже зарегестрирован',
  movieNotFound: 'Фильм с указанным id не найден',
  userNotFound: 'Пользователь не найден',
  pageNotFound: 'Страница не найдена',
  authorizationError: 'Ошибка авторизации',
};

module.exports = {
  NODE_ENV,
  PORT,
  DATA_BASE,
  JWT_SECRET,
  messages,
};
