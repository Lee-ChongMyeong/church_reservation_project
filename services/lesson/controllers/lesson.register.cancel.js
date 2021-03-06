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



// 수업 등록 취소   
router.put('/register/:classId/cancel', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const classId = req.params.classId;
    try{

        let myClassListInfo = await Lesson.findOne({ _id: classId, userId: user._id});
        console.log(myClassListInfo);

        if (myClassListInfo.length == 0 ) {
            return res.json({ msg: 'NO_EXISTS_DATA'})
        }
        
        await Lesson.updateOne({ _id : classId, userId: user._id }, { $set : { approveStatus : false }})

        res.json({ msg : 'success'})
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

/**
 * @swagger
 * /lesson/register/{uid}/cancel:
 *   put:
 *     summary: 수업 등록 취소 (admin)
 *     description: 수업 등록 취소
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
 */

module.exports = router;