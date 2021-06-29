const Book = require('./book');
const classList = require('./classList');
const material = require('./material');
const user = require('./user');

const DB = {
    Book,
    classList,
    material,
    user
};

module.exports = DB;