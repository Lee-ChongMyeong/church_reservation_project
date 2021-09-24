const express = require('express');
const router = express.Router();
const passport = require('../../../auth/passport');
const jwt = require('jsonwebtoken');

// 카카오 로그인
router.get('/kakao', passport.authenticate('kakao', null));

/**
 * @swagger
 * /passport/auth/kakao:
 *   get:
 *     summary: 카카오  로그인
 *     tags: [passport]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 */


module.exports = router;