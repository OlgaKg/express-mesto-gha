const routes = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { ERROR_NOT_FOUND } = require('../utils/constants');

routes.use('/', (req, _res, next) => {
  req.user = {
    _id: '64bc68f10e16c7c7b9f31183',
  };
  next();
});

routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

routes.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: `Ресурс по данному адресу ${req.path} не найден` });
});

module.exports = routes;
