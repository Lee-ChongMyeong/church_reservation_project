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



// 수업 신청 학생 승인
router.post('/apply/:classId/approve', authMiddleware, async(req, res) => { 
    const user = res.locals.user;
    const classId = req.params.classId;
    try{

        let classRegisterInfo,
            classRegisterInfoUserId,
            classRegisterInfoClassId,
            classInfo,
            classUserList,
            classManagePerson

        classRegisterInfo = await ClassRegister.find({ _id : classId});
        classRegisterInfoUserId = classRegisterInfo[0].userId;    
        classRegisterInfoClassId = classRegisterInfo[0].classId;    

        classInfo = await ClassList.find({ _id : classRegisterInfoClassId });
        classManagePerson = classInfo[0].userId;
        
        if (user._id != classManagePerson) {
            return res.json({ msg : 'not authorized'})
        }

        classUserList = classInfo[0].userList;
        classUserList.push(classRegisterInfoUserId);

        await ClassRegister.updateOne({ _id : classId }, { $set : { approveStatus : true }})
        await ClassList.updateOne({ _id : classRegisterInfoClassId }, { $set : { userList : classUserList }});

        res.json({ msg: 'success' })

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})


/**
 * @swagger
 * /lesson/apply/{uid}/approve:
 *  post:
 *    summary: 수업 신청 학생 승인 (manager)
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