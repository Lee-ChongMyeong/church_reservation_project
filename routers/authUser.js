const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const sanitize = require('../lib/sanitizeHtml');
const s3 = require('../lib/s3');
const multer = require('../lib/multer');
const { User } = require('../models');
require('dotenv').config();

// s3에서 이미지 삭제
const deleteImg = (fileName) => {
	fileName = fileName.split('.com/profileImg/')[1];
	console.log('deleteImg', deleteImg);
	s3.deleteObject(
		{
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: fileName
		},
		// eslint-disable-next-line no-unused-vars
		(err, data) => {
			if (err) console.log('s3에 지울 이미지 없음');
		}
	);
};

// 유저 정보
router.get('/', authMiddleware, async (req, res) => {
	const user = res.locals.user;
	console.log(user)
	res.json({
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
	});
});

// 유저 정보 등록(로그인)
router.patch('/', authMiddleware, multer.single('profileImg'), async(req, res) => {
	try{
		const user = res.locals.user;
		const data = req.body;

		if (user.first == true && (await User.findOne({ nickname: data.nickname }))) {
			return res.status(400).json({ msg: 'unavailable_nickname' });
		}
		if (2 > data.nickname.length || 12 < data.nickname.length)
			return res.status(400).json({ msg: 'please check nickname length' });

		if (data.introduce.length >= 50) {
			return res.status(400).json({ msg: 'please check introduce length' });
		}

		console.log('data', data)
		console.log('data.defaultImg', data.defaultImg);
		console.log('req.file', req.file.transforms[0].location);

		// 프로필 이미지가 들어온 경우
		if (data.defaultImg == 'true') {
			deleteImg(user.profileImg);
			user.profileImg =
				'https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg';
		} else if (req.file) {
			deleteImg(user.profileImg);
			user.profileImg = req.file.transforms[0].location;
		}

		user.name = sanitize(data.name);
		user.nickname = sanitize(data.nickname);
		user.churchName = sanitize(data.churchName);
		user.churchDuty = sanitize(data.churchDuty);
		user.introduce = sanitize(data.introduce);
		user.job = sanitize(data.job);
		user.phoneNumber = sanitize(data.phoneNumber);
		user.first = false;

		await user.save();

		res.json({
			userId: user._id,
			name: user.name,
			nickname: user.nickname,
			profileImg: user.profileImg,
			churchName: user.churchName,
			churchDuty: user.churchDuty,
			introduce: user.introduce,
			job: user.job,
			phoneNumber: user.phoneNumber,
			first: false
		});
	}catch(err){
		console.log(err);
		res.json({ msg: 'fail' });
	}
})

module.exports = router;
