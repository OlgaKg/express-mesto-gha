const routes = require('express').Router();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');
const {
  loginValidator, createUserValidator,
} = require('../middlewares/userValidator');
const {
  login, createUser,
} = require('../controllers/users');

routes.use(cookieParser());

routes.post('/signin', loginValidator, login);
routes.post('/signup', createUserValidator, createUser);
routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError(`Ресурс по данному адресу ${req.path} не найден`));
});

routes.use(errors());

routes.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = routes;
