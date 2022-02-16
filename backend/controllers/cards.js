const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    // вернём записанные в базу данные
    .then((cards) => res.send({ data: cards }))
    // данные не записались, вернём ошибку
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const owner = req.user._id;
  const { link, name } = req.body;
  Card.create({ link, name, owner })
    // вернём записанные в базу данные
    .then((card) => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.errors.link.name === 'ValidatorError') {
        next(new BadRequestError(`${err.errors.link.message}`));
      }
      if (err.name === ('ValidationError' || 'CastError')) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(new NotFoundError(`Карточка с указанным id ${req.params.cardId} не найдена`))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError(`Недостаточно прав для удаления карточки с указанным id ${req.params.cardId}`);
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.status(200).send({ message: 'Пост удалён' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id ${req.params.cardId} карточки`));
      } else { next(err); }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,

    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError(`Карточка с указанным id ${req.params.cardId} не найдена`))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id ${req.params.cardId} карточки`));
      } else { next(err); }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError(`Карточка с указанным id ${req.params.cardId} не найдена`))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id ${req.params.cardId} карточки`));
      } else { next(err); }
    });
};
