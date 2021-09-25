const express = require('express');
const router = express.Router();
const passport = require('../../../auth/passport');
const jwt = require('jsonwebtoken');

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
	passport.authenticate('kakao', { failureRedirect: '/passport/auth' }),
	(req, res) => {
		res.redirect(`http://localhost:3000/passport/auth/${makeToken(req.user._id)}`);
		console.log(`${makeToken(req.user._id)}`);
	}
);

/**
 * @swagger
 * /passport/auth/kakao/oauth:
 *   get:
 *     summary: 카카오 콜백
 *     tags: [passport]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 */


module.exports = router;
