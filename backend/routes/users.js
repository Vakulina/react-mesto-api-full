const router = require('express').Router(); // создали роутер
const {
  getUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');
const { validateUpdateUser, validateUpdateAvatar, validateGetUserById } = require('../middleware/validation-requests');
const celebrateErrorHandler = require('../middleware/celebtate-error-handler');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validateGetUserById, celebrateErrorHandler, getUserById);
router.patch('/me', validateUpdateUser, celebrateErrorHandler, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, celebrateErrorHandler, updateAvatar);

module.exports = router;
