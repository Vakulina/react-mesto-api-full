const { celebrate, Joi } = require('celebrate');

const { validationUrlExpression } = require('../utils/validateLink');

const validatePostUserReq = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    avatar: Joi.string().pattern(validationUrlExpression).messages({ 'string.pattern.base': 'URL в поле "аватар" невалидный' }),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(validationUrlExpression).messages({ 'string.pattern.base': 'URL в поле "аватар" невалидный' }),
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().messages({ 'string.alphanum': 'Некорректный id' }),
  }),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validatePostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(validationUrlExpression).messages({ 'string.pattern.base': 'URL в поле "ccskrf" невалидный' }),
  }),
});
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});
module.exports = {
  validatePostUserReq,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetUserById,
  validateLogin,
  validatePostCard,
  validateCardId,
};
