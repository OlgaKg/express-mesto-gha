const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { INTERNAL_SERVER_ERROR } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(routes);

routes.use(errors());
routes.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
