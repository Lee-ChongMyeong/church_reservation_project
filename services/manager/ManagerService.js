const express = require('express');
const router = express.Router();

router.use('/manager', require('./controllers/manager.approve'));
router.use('/manager', require('./controllers/manager.create'));
router.use('/manager', require('./controllers/manager.list'));
router.use('/manager', require('./controllers/manager.pending.list'));
router.use('/manager', require('./controllers/manager.reject'));

module.exports = router;