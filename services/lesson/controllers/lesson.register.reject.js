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



// 수업 등록 거절
router.delete('/register/reject/:uid', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const uid = req.params.uid;
    try{
        let waitingList = await ClassList.deleteOne({ _id: uid, approveStatus: false })
        
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
 * /lesson/register/{uid}/reject:
 *   delete:
 *     summary: 수업 등록 거절 (admin)
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