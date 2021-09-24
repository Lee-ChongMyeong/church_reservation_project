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



// 수업 정보 수정
router.put('/:classId', authMiddleware, async(req, res) => {
    const classId = req.params.classId;
    const data = req.body;
    try{
        let classInfo = await ClassList.findOne({ _id : classId })
        console.log(classInfo);

    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

/**
 * @swagger
 * /lesson/{id}:
 *  put:
 *    summary: 수업 정보 수정 (manager)
 *    tags: [lesson]
 *    parameters:
 *      - in: path
 *        name: Lesson ID
 *        schema:
 *          type: string
 *        required: true
 *        description: The lessonId
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 */


module.exports = router;