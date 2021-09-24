const express = require('express');
const router = express.Router();
const {
	Book,
    ClassList,
    Register,
    ClassRegister,
    User
} = require('../../../models');
const sanitize = require('../../../lib/sanitizeHtml');
const authMiddleware = require('../../../auth/authMiddleware');
const jwt = require('jsonwebtoken');
const multer = require('../../../lib/multer');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
require('dotenv').config();
const _ = require('lodash');



// 수업 등록 승인 대기 리스트
router.get('/register/pending', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    try{

        let items = await ClassList.find({ approveStatus: false})

        res.json({ msg: 'success', items })

    }catch(err){
        console.log(err);
        res.json({ msg: 'fail' });
    }
})

/**
 * @swagger
 * /lesson/register/pending:
 *   get:
 *     summary: 수업 등록 승인대기 리스트 (admin)
 *     security:
 *       - jwt: []
 *     tags: [lesson]
 * 
 *     responses:
 *       200:
 *         description: A successful response
 */

module.exports = router;