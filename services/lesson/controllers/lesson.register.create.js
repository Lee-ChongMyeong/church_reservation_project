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



// 수업 등록
router.post('/register', authMiddleware, multer.fields([{ name: 'classPicture', maxCount: 10}, { name: 'teacherImg', maxCount:10 }]), authMiddleware, async(req, res) => {
    const user = res.locals.user;
    try{
        if(user.status !== 'admin'){
            return res.json({ msg: "register admin"})
        }

        let result = {
            category: req.body.category,
            classTitle: req.body.classTitle,
            classIntroduce: req.body.classIntroduce,
            classPicture:  req.files.classPicture[0].transforms[0].location,
            availableCnt: req.body.availableCnt,
            classPlace: req.body.classPlace,
            classDay: req.body.classDay,
            classStartTime: req.body.classStartTime,
            classEndTime: req.body.classEndTime,
            teacherName: req.body.teacherName,
            teacherImg: req.files.teacherImg[0].transforms[0].location,
            userId : user._id,
        }
        await ClassList.create(result);
        
        res.json({ msg: 'success', result: result });
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'error' })
    }
})

/**
 * @swagger
 * /lesson/register:
 *  post:
 *    summary: 수업 등록 신청 (manager)
 *    tags: [lesson]
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: category
 *        description: category
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: classTitle
 *        description: classTitle
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: classIntroduce
 *        description: classIntroduce
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
 *      - name: classPlace
 *        description: classPlace
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
 *      - name: classPicture
 *        description: classPicture
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