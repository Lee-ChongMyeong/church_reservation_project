const Book = require('./Book');
const Lesson = require('./Lesson');
const Material = require('./Material');
const User = require('./User');
const ManagerRelation = require('./ManagerRelation');
const LessonRelation = require('./LessonRelation');
const Manager = require('./Manager');

const DB = {
    Book,
    Lesson,
    Manager,
    Material,
    User,
    ManagerRelation,
    LessonRelation
};

module.exports = DB;