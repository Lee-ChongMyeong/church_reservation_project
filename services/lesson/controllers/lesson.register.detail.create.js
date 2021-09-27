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



// 수업 상세 등록 
router.post('/register/:uid', multer.single('teacherImg'), authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const classId = req.params.uid;
    try{
        console.log('req.file', req.file);
        let originalClassInfo = await Lesson.findOne({ _id: classId })

        let result = {
            category: originalClassInfo.category,
            classTitle: originalClassInfo.classTitle,
            classIntroduce: originalClassInfo.classIntroduce,
            classPicture:  originalClassInfo.classPicture,
            classPlace: originalClassInfo.classPlace,
            classDay: req.body.classDay,
            classStartTime: req.body.classStartTime,
            classEndTime: req.body.classEndTime,
            availableCnt: req.body.availableCnt,
            teacherName: req.body.teacherName,
            teacherImg: req.file.transforms[0].location,
            userId : user._id,
        }
        await Lesson.create(result);
        
        res.json({ msg: 'success', result: result });
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'error' })
    }
})


/**
 * @swagger
 * /lesson/register/{uid}:
 *  post:
 *    summary: 수업 상세 수업 등록 (manager)
 *    tags: [lesson]
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: path
 *        name: Lesson Id
 *        schema:
 *          type: string
 *        required: true
 *        description: Lesson Id
 *      - name: classDay
 *        description: classDay
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: classStartTime
 *        description: classStartTime
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: availableCnt
 *        description: availableCnt
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: classEndTime
 *        description: classEndTime
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: teacherName
 *        description: teacherName
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: teacherImg
 *        description: teacherImg
 *        in: formData
 *        required: false
 *        schema:
 *          type: file
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