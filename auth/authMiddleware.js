const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const [tokenType, tokenValue] = authorization.split(' ');
		if (tokenType !== 'Bearer') {
			res.json({
				msg: 'TypeIncorrect'
			});
			return;
		}
		const { userId } = jwt.verify(tokenValue, process.env.JWT_SECRET);
		User.findById(userId)
			.exec()
			.then((user) => {
				if (user.provider === '탈퇴') {
					return res.status(403).json({ msg: 'quited user' });
				}
				res.locals.user = user;
				next();
			})
			.catch(() => {
				res.json({
					msg: 'not_login'
				});
			});
	} catch (error) {
		console.log(error);
		res.json({
			msg: 'not_login'
		});
		return;
	}
};
