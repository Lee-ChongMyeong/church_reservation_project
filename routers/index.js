const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/classList', require('./classList'));
router.use('/mypage', require('./mypage'));
router.use('/book', require('./book'));
router.use('/login', require('./login'));
router.use('/kauth.kakao.com', require('./kakao'));

module.exports = router;