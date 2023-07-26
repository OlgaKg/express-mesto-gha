const { ValidationError, CastError } = require('mongoose').Error;
const User = require('../models/user');
const {
  OK_STATUS,
  CREATED_STATUS,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find({});
    res.status(OK_STATUS).send({ data: users });
  } catch (error) {
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id нет' });
      return;
    }
    res.status(OK_STATUS).send({ data: user });
  } catch (error) {
    if (error instanceof CastError) {
      res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(CREATED_STATUS).send({ data: user });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    if (!name || !about) {
      res.status(ERROR_BAD_REQUEST).send({ message: 'Отсутствуют обязательные поля: name и about' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' });
      return;
    }
    res.status(OK_STATUS).send({ data: user });
  } catch (error) {
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      res.status(ERROR_BAD_REQUEST).send({ message: 'Отсутствует обязательное поле: avatar' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' });
      return;
    }
    res.status(OK_STATUS).send({ data: user });
  } catch (error) {
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
};
