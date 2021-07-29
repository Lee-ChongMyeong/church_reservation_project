const Book = require('./book');
const ClassList = require('./classList');
const Material = require('./material');
const User = require('./user');
const Register = require('./register');
const Approve = require('./approve');

const DB = {
    Book,
    ClassList,
    Material,
    User,
    Register,
    Approve
};

module.exports = DB;