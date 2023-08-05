const cardsRoutes = require('express').Router();
const {
  createCardValidator, cardIdValidator,
} = require('../middlewares/cardValidator');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', createCardValidator, createCard);
cardsRoutes.delete('/:cardId', cardIdValidator, deleteCard);
cardsRoutes.put('/:cardId/likes', cardIdValidator, likeCard);
cardsRoutes.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = cardsRoutes;
