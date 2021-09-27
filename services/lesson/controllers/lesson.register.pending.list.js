const express = require('express');
const router = express.Router();
const {
    Book,
    Lesson,
    Manager,
    Material,
    User,
    ManagerRelation,
    LessonRelation
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
    let items, total, data = {};
    try{

        let result = await Lesson.find({ approveStatus: false})
        console.log('res', res);
        data = {
            items: result,
            total: result.length
        }
        console.log('data', data);

        res.json({ msg: 'success', data})  

    }catch(err){
        console.log(err);
        res.json({ msg: 'fail' });
    }
});

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