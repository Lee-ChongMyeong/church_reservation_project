const express = require('express');
const router = express.Router();

router.use('/book', require('./controllers'));

module.exports = router;