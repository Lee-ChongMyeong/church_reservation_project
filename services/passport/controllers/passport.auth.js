const express = require('express');
const router = express.Router();
const passport = require('../../../auth/passport');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.send(
		`<a href='http://localhost:3000/passport/auth/kakao'> 카카오 로그인 </a>`
	);
});

// router.use('/user', require('../../authUser/controllers/authUser'));

/**
 * @swagger
 * /passport/auth:
 *   get:
 *     summary: 카카오 테스트
 *     tags: [passport]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 */


module.exports = router;
