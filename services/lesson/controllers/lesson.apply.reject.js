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



// 수업 거절
router.delete('/reject/:uid', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const uid = req.params.uid;
    try{
        let waitingList = await ClassRegister.deleteOne({ _id: uid, approveStatus: false })
        console.log('waitingList', waitingList);
        
        if(waitingList.deletedCount == 0 ){
            return res.json({ msg: 'NO_EXISTS_DATA'})
        }

        res.json({ msg: 'success'})
    }catch(err){
        console.log('err', err);
        res.json({ msg: 'fail'})
    }
})

/**
 * @swagger
 * /lesson/apply/{uid}/reject:
 *   delete:
 *     summary: 수업 신청 학생 거절 (manager)
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