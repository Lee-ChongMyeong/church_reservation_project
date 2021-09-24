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

// 수업 신청 
router.post('/apply/:classId', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const classId = req.params.classId;
    try{

        const userRegisterCheck = await ClassRegister.findOne({ userId: user._id, classId: classId})

        const classRegisterCheck = await ClassList.findOne({ _id: classId, approveStatus: false}); 

        if (classRegisterCheck != null){
            return res.json({ msg: 'not registered class'});
        }

        if (userRegisterCheck != null ){
            return res.json({ msg: 'already register'})
        }

        let result = {
            userId : user._id,
            classId : classId
        }
        await ClassRegister.create(result);

        res.json({ msg : 'success' });
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

/**
 * @swagger
 * /lesson/apply/{uid}:
 *  post:
 *    summary: 수업 신청 (user)
 *    security:
 *      - jwt: []
 *    tags: [lesson]
 *    parameters:
 *      - in: path
 *        name: Lesson Id
 *        schema:
 *          type: string
 *        required: true
 *        description: Lesson Id
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 */

module.exports = router;