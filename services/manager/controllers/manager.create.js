const express = require('express');
const router = express.Router();

const authMiddleware = require('../../../auth/authMiddleware');
const sanitize = require('../../../lib/sanitizeHtml');
const s3 = require('../../../lib/s3');
const multer = require('../../../lib/multer');
require('dotenv').config();

const {
    Book,
    Lesson,
    Manager,
    Material,
    User,
    ManagerRelation,
    LessonRelation
} = require('../../../models');

// 교회 단체 등록 신청
router.post('/', authMiddleware, async(req, res) => {
    try{
        const user = res.locals.user;
        let classPlaceList = [],
            item,
            total,
            data = {};

        if(user.applyStatus == true){
            return res.json({ msg : 'admin checking' });
        }

        console.log('1')

        console.log('req.body', req.body);


        console.log('2')

        let result = await ManagerRelation.create({
            name : user.name,
            classPlace : req.body.classPlace,
            phoneNumber : req.body.phoneNumber,
            introduce: req.body.introduce,
            userId : user._id,
        });

        console.log('result', result);
        console.log('result.lengtrh', result.length);

        await User.updateOne({ _id : user._id }, { $set : { applyStatus : true}});
        
        data = {
            item: result,
            total: result.length
        }

        res.status(200).json({ msg: 'success', data })

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});

/**
 * 
 * /manager:
 *  post:
 *    summary: 교회 단체 신청 (user)
 *    tags: [manager]
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: classPlace
 *        description: 수업장소
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: phoneNumber
 *        description: 핸드폰 번호
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *      - name: introduce
 *        description: 소개
 *        in: formData
 *        required: true
 *        schema:
 *          type: string
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: A successful response
 */

/**
 * @swagger
 * /manager:
 *  post:
 *    summary: 교회 단체 신청 (user)
 *    tags: [manager]
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            classPlace:
 *              example: "장소"
 *            phoneNumber: 
 *              example: "번호"
 *            introduce: 
 *              example: "소개"
 * 
 *    security:
 *      - jwt: []
 *    responses:
 *      200:
 *        description: A successful response
 */

module.exports = router;