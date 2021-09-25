const { User } = require('../models');
/* eslint-disable no-constant-condition */
const KakaoStrategy = require('passport-kakao').Strategy;
require('dotenv').config();
// 카카오 로그인 전략

const kakaoStrategy = new KakaoStrategy(
	{
		clientID: process.env.KAKAO_CLIENT_ID,
		clientSecret: process.env.KAKAO_SECRET,
		// callbackURL: 'http://localhost:3000/auth'
		// callbackURL: 'http://localhost:3000/auth/kakao/oauth'
		callbackURL: 'http://54.180.139.155/passport/auth/kakao/oauth'
		// callbackURL: 'http://localhost:3000/auth'
		// 소셜 로그인 -> 승인 -> 백엔드 api -> redirect 
	},
	function (accessToken, refreshToken, profile, done) {
		try { 
			User.findOne(
				{
					socialId: profile.id
				},
				async function (err, user) {
					if (!user) {
						let name = 'new';
						user = new User({
							name: name,
							provider: 'kakao',
							socialId: profile.id
						});
						user.save(function (err) {
							if (err) console.log(err);
							return done(err, user);
						});
					} else {
						return done(err, user);
					}
				}
			);
		} catch (err) {
			console.log(err);
			return done(err, false);
		}
	}
);

module.exports = kakaoStrategy;
