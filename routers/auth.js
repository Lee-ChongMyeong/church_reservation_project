const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.send(
		`<a href='http://localhost:3000/auth/kakao'> 카카오 로그인 </a>`
	);
});

router.use('/user', require('./authUser'));

// 카카오 로그인
router.get('/kakao', passport.authenticate('kakao', null));

// 카카오 콜백
router.get(
	'/kakao/oauth',
	passport.authenticate('kakao', { failureRedirect: '/auth' }),
	(req, res) => {
		res.redirect(`https://localhost:3000/auth/${makeToken(req.user._id)}`);
	}
);


module.exports = router;
