const express = require('express');
const router = express.Router();

router.use('/passport/auth', require('./controllers/passport.auth'));
router.use('/passport/auth', require('./controllers/passport.auth.kakao'));
router.use('/passport/auth', require('./controllers/passport.auth.kakao.callback'));

module.exports = router;