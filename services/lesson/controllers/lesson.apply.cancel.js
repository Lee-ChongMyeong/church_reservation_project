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

// 수업 신청 학생 취소
router.put('/apply/cancel/:classRegisterId', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const classRegisterId = req.params.classRegisterId;
    try{

        let classRegisterInfo = await ClassRegister.findOne({ _id : classRegisterId });
        let studentId = classRegisterInfo.userId;
        let classListInfo = await ClassList.findOne({ _id : classRegisterInfo.classId });
        let userList = classListInfo.userList;
        let updatedUserList = userList.splice(studentId, 1);

        await ClassList.updateOne({_id : classRegisterInfo.classId }, { $set : { userList : updatedUserList }});
        await ClassRegister.updateOne({ _id : classRegisterId }, { $set : { approveStatus : false }})

        res.json({ msg : 'success'})
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

// class_registers 테이블 -> 수업 등록한 인원

/**
 * @swagger
 * /lesson/apply/{uid}/cancel:
 *   put:
 *     summary: 수업 신청 학생 취소 (manager)
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
 * 
 *     responses:
 *       200:
 *         description: A successful response
 */

module.exports = router;