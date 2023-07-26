const { ValidationError, CastError } = require('mongoose').Error;
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
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
        return;
      } if (user) {
        res.status(OK_STATUS).send({ data: user });
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
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
      if (err instanceof ValidationError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      } res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(ERROR_BAD_REQUEST).send({ message: 'Отсутствуют обязательные поля: name и about' });
    return;
  }

  User.findByIdAndUpdate(req.params._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' });
        return;
      }
      res.status(OK_STATUS).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(ERROR_BAD_REQUEST).send({ message: 'Отсутствует обязательное поле: avatar' });
    return;
  }

  User.findByIdAndUpdate(req.params._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' });
        return;
      }
      res.status(OK_STATUS).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};
