const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
