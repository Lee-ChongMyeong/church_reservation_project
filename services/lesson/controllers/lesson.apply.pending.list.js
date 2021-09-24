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


// 수업 신청 승인 대기 리스트
router.get('/apply/pending', authMiddleware, async(req, res) => { 
    const user = res.locals.user;
    try{
        let classRegisterWaitingList;
        let myClassList;
        let myClassListId= [];
        let items = [];
        let temp = {};
        let total;

        myClassList = await ClassList.find({ userId : user._id, approveStatus : true});

        for (let i=0; i < myClassList.length; i++ ) {
            myClassListId.push(myClassList[i]._id);
        }

        classRegisterWaitingList = await ClassRegister.find({ approveStatus : false, classId : {$in: myClassListId }}, { createdAt: false, updatedAt: false, id: false });
        for (let i = 0; i < classRegisterWaitingList.length; i++ ){
            let userInfo = await User.findOne({ _id : classRegisterWaitingList[i].userId})
            temp = {
                _id : classRegisterWaitingList[i]._id,
                approveStatus : classRegisterWaitingList[i].approveStatus,
                userId : classRegisterWaitingList[i].userId,
                classId: classRegisterWaitingList[i].classId,
                name : userInfo.name,
                profileImg: userInfo.profileImg,
                introduce: userInfo.introduce,
                phoneNumber: userInfo.phoneNumber 
            }
            if (classRegisterWaitingList.length > 0){
                items.push(temp);
            }
        }

        total = items.length;

        if(total == 0 ){
            return res.json ({ msg: 'no waiting list'})
        }

        res.json({ msg: 'success', items, total });

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

/**
 * @swagger
 * /lesson/apply/pending:
 *   get:
 *     summary: 수업 신청 승인 대기 리스트 (manager)
 *     security:
 *       - jwt: []
 *     tags: [lesson]
 *     responses:
 *       200:
 *         description: A successful response
 *         contens:
 *           application/json:
 *             schema:
 */

module.exports = router;