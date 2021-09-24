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

// 교육 리스트
router.get('/', async(req, res) => {
    try{
        let classes = await ClassList.find({ approveStatus : true }).select('classPicture category classTitle classPlace classIntroduce availableCnt')
        res.json({ msg: "success", classLists: classes })
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

/**
 * @swagger
 * /lesson:
 *   get:
 *     summary: 수업 리스트 (user)
 *     tags: [lesson]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 */

module.exports = router;

