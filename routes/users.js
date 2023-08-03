const usersRoutes = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, login, createUser, getCurrentUser,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const {
  loginValidator, userIdValidator, updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/userValidator');

usersRoutes.post('/signin', loginValidator, login);
usersRoutes.post('/signup', loginValidator, createUser);

usersRoutes.use(authMiddleware);

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', userIdValidator, getUserById);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', updateProfileValidator, updateProfile);
usersRoutes.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = usersRoutes;
