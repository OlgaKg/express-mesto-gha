const usersRoutes = require('express').Router();
// const authMiddleware = require('../middlewares/auth');
const {
  userIdValidator, updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/userValidator');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', userIdValidator, getUserById);
usersRoutes.patch('/me', updateProfileValidator, updateProfile);
usersRoutes.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = usersRoutes;
