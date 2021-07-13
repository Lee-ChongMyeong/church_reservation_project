

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sanitizeHtml = require('sanitize-html');
const crypto = require('crypto');
const {
    Book,
    ClassList,
    Material,
    User
} = require('../models');
require('dotenv').config();



// [아이디, 비밀번호 회원가입간 확인]
function check_id(id) {
	if (id.length < 3) {
		return false;
	}
	const available_char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
	for (char of id) {
		if (!available_char.includes(char)) {
			return false;
		}
	}
	return true;
}

function check_password(id, password) {
	if (password.length < 4) {
		return false;
	}
	if (password.includes(id)) {
		return false;
	}
	if (id.includes(password)) {
		return false;
	}
	if (password.includes(' ')) {
		return false;
	}
	return true;
}

function check_nickname(nickname) {
	if (nickname.length < 3) {
		return false;
	}
	if (nickname.length > 10) {
		return false;
	}
	if (nickname.includes(' ')) {
		return false;
	}
	return true;
}

//// [회원가입]
router.post('/register', async (req, res) => {
	const { id, password, confirmPassword, nickname } = req.body;
    console.log(1)
    try {
        console.log(2)
        const existUsers = await User.findOne({ $or: [{ id }] });
        const existNickname = await User.find({ $or : [{ nickname }]});
        const existEmail = await User.find({ $or : [{ email }]});

        console.log(3)
        if (existUsers.length) {
            res.send({
                err : "이미 가입된 아이디가 있습니다.",
            });
            return;
        }

        if (existNickname.length) {
            res.send({
                err : "이미 가입된 닉네임이 있습니다."
            })
        }

        if (existEmail.length) {
            res.send({
                err : "이미 가입된 이메일이 있습니다."
            })
        }

        await User.create({ nickname, id, confirmPassword, password});
        return res.status(201).send({ result: "회원가입 완료!" });

    } catch (error) {
        console.log(error)
        return res.status(400).send({ err: "회원가입에 실패했습니다." });
    }
});

// 로그인
router.post('/', async (req, res) => {
	const { id, password } = req.body;

	try {
		const user = await User.find({ id }).exec();

		if (!id || !password) {
			res.json({ msg: 'fail' });
			return;
		}

		if (id != user.id) {
			res.json({ msg: 'fail' });
			return;
		}

		if (user) {
			await bcrypt.compare(password, user.password, (err, match) => {
				if (match) {
					const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
					res.json({ msg: 'success', token });
				} else {
					res.json({ msg: 'fail' });
				}
			});
		}
	} catch {
		res.json({ msg: 'fail' });
	}
});


//// [내정보 조회]
router.get('/me', async (req, res) => {
	res.send({ user: res.locals.user });
});



module.exports = router;
