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

const makeToken = (userId) => {
	const payload = {
		userId,
		exp: parseInt(Date.now() / 1000) + 60 * 60 * 24 * 30, // 만료기간 30일
		iat: parseInt(Date.now() / 1000)
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
};

// 카카오 콜백
router.get(
	'/kakao/oauth',
	passport.authenticate('kakao', { failureRedirect: '/auth' }),
	(req, res) => {
		res.redirect(`http://localhost:3000/auth/${makeToken(req.user._id)}`);
		console.log(`${makeToken(req.user._id)}`);
	}
);


module.exports = router;
