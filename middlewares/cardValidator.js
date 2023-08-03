const { celebrate, Joi } = require('celebrate');

module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=%]+#?$/).required(),
  }),
});

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
