const usersRoutes = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', createUser);
usersRoutes.patch('/:userId', updateProfile); // me
usersRoutes.patch('/:userId/avatar', updateAvatar); // me

module.exports = usersRoutes;
