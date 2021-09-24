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



// 수업 상세 수정
router.put('/detail/:classId', authMiddleware, async(req, res) => {
    const classId = req.params.classId;
    const data = req.body;
    try{
        let classInfo = await ClassList.findOne({ _id : classId }).select('classDay classStartTime classEndTime availableCnt userList teacherName teacherImg').lean()
        
        data = _.pickBy(
            {
              campaign_id,
              user_id,
              product_id,
              reward_reason,
              reward_info,
              reward_expired_at,
              status,
              provided_at,
              expired_at,
              delivered_at,
              received,
              received_at,
            },
            (param) => {
              return typeof param !== "undefined";
            }
          )

          console.log('data', data);

        res.json({ msg: "success", classListsDetail: classInfo })
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

/**
 * @swagger
 * /lesson/detail/{uid}:
 *  put:
 *    summary: 수업 상세 수정 (manager)
 *    tags: [lesson]
 *    security:
 *      - jwt: []
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