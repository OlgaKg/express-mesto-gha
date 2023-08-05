const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  // }
  // const token = authorization.replace('Bearer ', '');
  if (!req.cookies.jwt) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
