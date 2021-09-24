const express = require('express');
const router = express.Router();

router.use('/mypage', require('./controllers'));

module.exports = router;