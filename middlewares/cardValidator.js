const { celebrate, Joi } = require('celebrate');

module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(/(?:https?):\/\/(w{3}\.)?\w+([.|-]{1,}\w+)*\.[0-9a-zA-Z-]+(\/[\w\-.~:/?#[\]@!$&'()*+,;=]*#?)?/).required(),
  }),
});

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
