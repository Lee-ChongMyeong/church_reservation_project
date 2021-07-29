const express = require('express');
const router = express.Router();
const {Register, User, Approve} = require('../models');
const sanitize = require('../lib/sanitizeHtml');
const authMiddleware = require('../auth/authMiddleware');

// 교회 등록 신청
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

// 교회 등록 대기 리스트
router.get('/', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    try{
        const waitingList = await Register.find().select('name classPlace phoneNumber introduce userId ')
        res.json({ waitingList });
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});

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

// 교회 등록 거절
router.patch('/reject/:userId', authMiddleware, async(req, res) => {
    const userId = req.params.userId;
    const user = res.locals.user;
    try{

        const userInfo = await User.findOne({ _id : userId });
        // console.log('userInfo', userInfo);
        await User.updateOne({ _id : userId }, { $set : { applyStatus : false }});
        await Register.deleteMany({ userId : userId })
        
        res.json({ msg: 'success' })   
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

// 교회 등록 승인 리스트
router.get('/approve', authMiddleware, async(req, res) => {

    try{
        const approveInfo = await Approve.find({ }).select('name classPlace phoneNumber introduce userId ')
    
        res.json({ msg: 'success', approveInfo: approveInfo })  
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});


module.exports = router;