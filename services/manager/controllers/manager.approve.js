const express = require('express');
const router = express.Router();
const {Register, User, Approve} = require('../../../models');
const sanitize = require('../../../lib/sanitizeHtml');
const authMiddleware = require('../../../auth/authMiddleware');


// 교회 등록 승인
router.post('/approve/:userId', authMiddleware, async(req, res) => {
    const userId = req.params.userId;
    try{
        let classPlaceList = [];

        const userInfo = await User.findOne({ _id : userId });
        if(userInfo.applyStatus == false){
            return res.json({ msg: 'apply admin'})
        }

        if(userInfo.status == 'admin'){

            for (let i = 0; i < userInfo.classPlace.length; i++ ) {
                classPlaceList.push(userInfo.classPlace[i]);
            }
            console.log(classPlaceList);


            const registerInfo = await Register.findOne({ userId : userId });
            classPlaceList.push(registerInfo.classPlace)
            console.log(classPlaceList);

            await User.updateOne({ _id : userId }, { $set : { classPlace : classPlaceList }});
            await User.updateOne({ _id : userId }, { $set : { applyStatus : false}});
            await Register.deleteMany({ userId : userId })

            await Approve.create({
                name : registerInfo.name,
                classPlace : registerInfo.classPlace,
                phoneNumber : registerInfo.phoneNumber,
                introduce: registerInfo.introduce,
                userId : userId,
            });

            res.json({ msg: 'success1' })   
        }else{
            const registerInfo = await Register.findOne({ userId : userId });

            await User.updateOne({ _id : userId }, { $set : { status : 'admin'}});
            await User.updateOne({ _id : userId }, { $set : { classPlace : registerInfo.classPlace }});
            await User.updateOne({ _id : userId }, { $set : { applyStatus : false}});
            await Register.deleteMany({ userId : userId })
            res.json({ msg: 'success2' })   

            await Approve.create({
                name : registerInfo.name,
                classPlace : registerInfo.classPlace,
                phoneNumber : registerInfo.phoneNumber,
                introduce: registerInfo.introduce,
                userId : userId,
            });
        }

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

/**
 * @swagger
 * /manager/approve/{gid}:
 *  post:
 *    summary: // 교회 단체 승인 (admin)
 *    tags: [manager]
 *    parameters:
 *      - in: path
 *        name: User Id
 *        schema:
 *          type: string
 *        required: true
 *        description: User Id
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