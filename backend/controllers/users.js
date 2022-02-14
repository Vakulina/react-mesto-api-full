const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');
const { SECRET_KEY } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.postUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        if (err.name === ('CastError')) {
          next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        }
        if (err.name === 'ValidationError') {
          next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
        }
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new ConflictError('Данный пользователь уже зарегистрирован!'));
        } else { next(err); }
      }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    // вернём записанные в базу данные
    .then((users) => res.send({ data: users }))
    // данные не записались, вернём ошибку
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError(`Пользователь по указанному id ${userId} не найден`))
    // вернём записанные в базу данные
    .then((users) => res.status(200).send(users))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id ${userId} пользователя`));
      } else { next(err); }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError(`Пользователь по указанному id ${userId} не найден`))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id ${userId} пользователя`));
      } else { next(err); }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError(`Пользователь по указанному id ${userId} не найден`))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.errors.avatar.name === 'ValidatorError') {
        next(new BadRequestError(`${err.errors.avatar.message}`));
      }
      if (err.name === ('CastError')) {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      } else { next(err); }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        })
        .then(() => {
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY, { expiresIn: '7d' });
          // вернём токен
          res.send({ token });
        })
        .catch(() => {
          next(new UnauthorizedError('Неправильные почта или пароль'));
        });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};
