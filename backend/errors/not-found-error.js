const { NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FoundError';
    this.statusCode = NOT_FOUND;
  }
}
module.exports = NotFoundError;
