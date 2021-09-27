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



// 수업 등록 승인
router.post('/register/:classId/approve', authMiddleware, async(req, res) => { 
    const user = res.locals.user;
    const classId = req.params.classId;
    console.log(classId);
    try{
        if(user.approveStatus == true){
            return res.json({ msg: 'not yet approved'})
        }

        await ClassList.updateOne({ _id : classId }, { $set : { approveStatus : true }})
        res.json({ msg: 'success' })

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

/**
 * @swagger
 * /lesson/register/{uid}/approve:
 *  post:
 *    summary: 수업 등록 승인 (admin)
 *    tags: [lesson]
 *    parameters:
 *      - in: path
 *        name: Lesson Id
 *        schema:
 *          type: string
 *        required: true
 *        description: Lesson Id
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 */

module.exports = router;