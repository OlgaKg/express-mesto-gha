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
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
      } else {
        res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .orFail(new Error('NotValidData'))
    .then((user) => res.status(CREATED_STATUS).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotValidData') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  // eslint-disable-next-line max-len
  User.findByIdAndUpdate(req.params._id, { name, about }, { new: true }) // возможна ошибка из за id
    .orFail(new Error('NotValidData'))
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotValidData') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
      } else {
        res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.userId, { avatar }, { new: true }) // id
    .orFail(new Error('NotValidData'))
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotValidData') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
      } else {
        res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
