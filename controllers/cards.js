const Card = require('../models/card');
const {
  OK_STATUS,
  CREATED_STATUS,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS).send({ data: cards }))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_STATUS).send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotValidData') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    // .orFail(new Error('NotValidId'))
    .then((card) => res.status(OK_STATUS).send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточки с таким id нет' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(CREATED_STATUS).send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotValidData') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      } if (err.name === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточки с таким id нет' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(CREATED_STATUS).send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotValidData') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      } if (err.name === 'NotValidId') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточки с таким id нет' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
};
