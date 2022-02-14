const router = require('express').Router(); // создали роутер
const {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validatePostCard, validateCardId } = require('../middleware/validation-requests');
const celebrateErrorHandler = require('../middleware/celebtate-error-handler');

router.get('/', getCards);
router.post('/', validatePostCard, celebrateErrorHandler, postCard);
router.delete('/:cardId', validateCardId, celebrateErrorHandler, deleteCard);

router.put('/:cardId/likes', validateCardId, celebrateErrorHandler, likeCard);
router.delete('/:cardId/likes', validateCardId, celebrateErrorHandler, dislikeCard);

module.exports = router;
