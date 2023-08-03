const { celebrate, Joi } = require('celebrate');

// module.exports.createUserValidator = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     about: Joi.string().required().min(2).max(30),
//     avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:
// /?#[\]@!$&'()*+,;=%]+#?$/).required(),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// });

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=%]+#?$/),
  }),
});
