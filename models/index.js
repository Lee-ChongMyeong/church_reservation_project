const Lesson = require('./Lesson');
const User = require('./User');
const ManagerRelation = require('./ManagerRelation');
const Manager = require('./Manager');

const DB = {
    Lesson,
    Manager,
    User,
    ManagerRelation,
};

module.exports = DB;