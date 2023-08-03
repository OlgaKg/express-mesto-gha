const usersRoutes = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, login, createUser, getCurrentUser,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const {
  loginAndCreateUserValidator, userIdValidator, updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/userValidator');

usersRoutes.post('/signin', loginAndCreateUserValidator, login);
usersRoutes.post('/signup', loginAndCreateUserValidator, createUser);

usersRoutes.use(authMiddleware);

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', userIdValidator, getUserById);
usersRoutes.patch('/me', updateProfileValidator, updateProfile);
usersRoutes.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = usersRoutes;
