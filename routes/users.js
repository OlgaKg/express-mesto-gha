const usersRoutes = require('express').Router();
const {
  userIdValidator, updateProfileValidator,
  updateAvatarValidator,
} = require('../middlewares/userValidator');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/userController');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', userIdValidator, getUserById);
usersRoutes.patch('/me', updateProfileValidator, updateProfile);
usersRoutes.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = usersRoutes;
