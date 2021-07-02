const express = require('express');
const router = express.Router();

router.use('/classList', require('./classList'));
router.use('/mypage', require('./mypage'));
router.use('/book', require('./book'));
router.use('/auth', require('./login'));

module.exports = router;