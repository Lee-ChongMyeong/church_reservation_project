const express = require('express');
const router = express.Router();
const authMiddleware = require('../../../auth/authMiddleware');
const sanitize = require('../../../lib/sanitizeHtml');
const s3 = require('../../../lib/s3');
const multer = require('../../../lib/multer');
const { User } = require('../../../models');
require('dotenv').config();


// 유저 정보
router.get('/', authMiddleware, async (req, res) => {
	const user = res.locals.user;
	let item, userInfo, data = {};

	try{

		data = {
			userId: user.userId,
			name: user.name,
			nickname: user.nickname,
			churchName: user.churchName,
			churchDuty: user.churchDuty,
			job: user.job,
			phoneNumber: user.phoneNumber,
			profileImg: user.profileImg,
			introduce: user.introduce,
			first: user.first,
			applyStatus: user.applyStatus,
			status: user.status
		}

		res.json({ msg: 'success', data })   

	}catch(err){
		console.log(err);
		res.status(400).json({ msg: 'fail'})
	}
	


	
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: 유저 정보
 *     security:
 *       - jwt: [user]
 *     tags: [user]
 *     responses:
 *       200:
 *         description: A successful response
 *         contens:
 *           application/json:
 *             schema:
 */

module.exports = router;