const routes = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const authMiddleware = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const {
  login, createUser,
} = require('../controllers/userController');
const {
  loginValidator, createUserValidator,
} = require('../middlewares/userValidator');

routes.post('/signin', loginValidator, login);
routes.post('/signup', createUserValidator, createUser);

routes.use(authMiddleware);
routes.use('/users', userRouter);
routes.use('/cards', cardRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError(`Ресурс по данному адресу ${req.path} не найден`));
});

module.exports = routes;
