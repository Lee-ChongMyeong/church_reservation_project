const express = require('express');
const router = express.Router();
const {Register, User, Approve} = require('../../../models');
const sanitize = require('../../../lib/sanitizeHtml');
const authMiddleware = require('../../../auth/authMiddleware');

// 교회 단체 등록 신청
router.post('/', authMiddleware, async(req, res) => {
    try{
        const user = res.locals.user;
        let classPlaceList = [];

        if(user.applyStatus == true){
            return res.json({ msg : 'admin checking' });
        }

        const { classPlace, phoneNumber, introduce } = req.body;
        await User.updateOne({ _id : user._id }, { $set : { applyStatus : true}});

        let result = await Register.create({
            name : user.name,
            classPlace : classPlace,
            phoneNumber : phoneNumber,
            introduce: introduce,
            userId : user._id,
        });
        
        res.status(200).json({ result })

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});

/**
 * @swagger
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
 *        content:
 *          application/json:
 *            schema:
 */

module.exports = router;