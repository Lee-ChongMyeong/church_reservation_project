const express = require('express');
const router = express.Router();

router.use('/lesson', require('./controllers/lesson.apply'));
router.use('/lesson', require('./controllers/lesson.apply.pending.list'));
router.use('/lesson', require('./controllers/lesson.apply.approve'));
router.use('/lesson', require('./controllers/lesson.apply.cancel'));
router.use('/lesson', require('./controllers/lesson.get'));
router.use('/lesson', require('./controllers/lesson.list'));
router.use('/lesson', require('./controllers/lesson.register.create'));
router.use('/lesson', require('./controllers/lesson.register.approve'));
router.use('/lesson', require('./controllers/lesson.register.cancel'));
router.use('/lesson', require('./controllers/lesson.register.detail.create'));
router.use('/lesson', require('./controllers/lesson.register.reject'));
router.use('/lesson', require('./controllers/lesson.register.pending.list'));
router.use('/lesson', require('./controllers/lesson.apply.reject'));
router.use('/lesson', require('./controllers/lesson.update'));
router.use('/lesson', require('./controllers/lesson.update.detail'));

module.exports = router;