const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const {
  OK_STATUS,
  CREATED_STATUS,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.status(OK_STATUS).send({ data: users }))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_STATUS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.CastError || err.kind === 'ObjectId') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      } if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Невалидные данные' });
        return;
      } res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params._id, { name, about }, { new: true })
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
        return;
      } res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params._id, { avatar }, { new: true })
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      } if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};
