const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
// 인증 ^^
router.get('/', authMiddleware, async (req, res) => {
	const user = res.locals.user;
	res.json({
		userId: user.userId,
		name: user.name,
		profileImg: user.profileImg,
		introduce: user.introduce,
		topic: user.preferredTopic,
		first: user.first
	});
});

module.exports = router;
