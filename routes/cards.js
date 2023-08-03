const cardsRoutes = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const authMiddleware = require('../middlewares/auth');
const {
  createCardValidator, cardIdValidator,
} = require('../middlewares/cardValidator');

cardsRoutes.use(authMiddleware);

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', createCardValidator, createCard);
cardsRoutes.delete('/:cardId', cardIdValidator, deleteCard);
cardsRoutes.put('/:cardId/likes', cardIdValidator, likeCard);
cardsRoutes.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = cardsRoutes;
