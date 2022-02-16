require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler');
const NotFoundError = require('./errors/not-found-error');
const { validatePostUserReq, validateLogin } = require('./middleware/validation-requests');
const celebrateErrorHandler = require('./middleware/celebtate-error-handler');
const cors = require('./middleware/cors');
const {
  requestLogger,
  errorLogger,
} = require('./middleware/logger');

// Слушаем 3000 порт
const { auth } = require('./middleware/auth');

const app = express();

const {
  postUser, login,
} = require('./controllers/users');

app.use(cors);
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {});
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, celebrateErrorHandler, login);

app.post('/signup', validatePostUserReq, celebrateErrorHandler);
app.post('/signup', postUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
app.use(errorLogger);
app.use(errorHandler);
module.exports = app;
