const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DATA_BASE } = require('./utils/config');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ],
    credentials: true,
  }),
);

app.use(requestLogger);
app.use(cookieParser());
app.use(helmet());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect(DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
