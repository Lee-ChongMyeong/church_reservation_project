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


// 수업 상세 리스트
router.get('/:classId', authMiddleware, async(req, res) => {
    const classId = req.params.classId;
    let data;
    try{
        let classInfo = await Lesson.findOne({ _id : classId }).select('classPicture classTitle classIntroduce classDay classStartTime classEndTime availableCnt userList teacherName teacherImg').lean()

        classInfo.currentAvailableCnt = (classInfo.availableCnt - classInfo.userList.length);
    
        data = classInfo

        res.json({ msg: 'success', data })  
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

/**
 * @swagger
 * /lesson/{uid}:
 *   get:
 *     summary: 수업 리스트 디테일 (user)
 *     security:
 *       - jwt: []
 *     tags: [lesson]
 *     parameters:
 *       - in: path
 *         name: Lesson Id
 *         schema:
 *           type: string
 *         required: true
 *         description: Lesson Id
 *     responses:
 *       200:
 *         description: A successful response
 *         contens:
 *           application/json:
 *             schema:
 */


module.exports = router;
