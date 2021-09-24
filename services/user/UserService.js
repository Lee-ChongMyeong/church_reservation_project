const express = require('express');
const router = express.Router();

router.use('/user', require('./controllers/user.get'));
router.use('/user', require('./controllers/user.register'));

module.exports = router;