const express = require('express');
const router = express.Router();
const {
	Book,
    ClassList,
    Register,
    ClassRegister,
    User
} = require('../models');
const authMiddleware = require('../auth/authMiddleware');
const jwt = require('jsonwebtoken');
const multer = require('../lib/multer');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
require('dotenv').config();

// 교육 리스트 
router.get('/', async(req, res) => {
    try{
        let classes = await ClassList.find({ approveStatus : true }).select('classPicture category classTitle classPlace classIntroduce availableCnt')
        res.json({ msg: "success", classLists: classes })
    }catch(err){
        result['msg'] = 'error';
    }
});

// 교육 상세 리스트
router.get('/detail/:classId', authMiddleware, async(req, res) => {
    const classId = req.params.classId;
    try{
        let classInfo = await ClassList.find({ _id : classId }).select('classDay classStartTime classEndTime availableCnt teacherName teacherImg')
        console.log('classInfo', classInfo);
        
        res.json({ msg: "success", classListsDetail: classInfo })
    }catch(err){
        result['msg'] = 'error';
    }
});

// 교육 신청
router.post('/classApply/:classId', authMiddleware, async(req, res) => {
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

// 교육 신청 승인
router.post('/classApply/:classId/approve', authMiddleware, async(req, res) => { 
    const user = res.locals.user;
    const classId = req.params.classId;
    try{

        let classRegisterInfo,
            classRegisterInfoUserId,
            classRegisterInfoClassId,
            classInfo,
            classUserList,
            classManagePerson

        classRegisterInfo = await ClassRegister.find({ _id : classId});
        classRegisterInfoUserId = classRegisterInfo[0].userId;    
        classRegisterInfoClassId = classRegisterInfo[0].classId;    

        classInfo = await ClassList.find({ _id : classRegisterInfoClassId });
        classManagePerson = classInfo[0].userId;
        
        if (user._id != classManagePerson) {
            return res.json({ msg : 'not authorized'})
        }

        classUserList = classInfo[0].userList;
        classUserList.push(classRegisterInfoUserId);

        await ClassRegister.updateOne({ _id : classId }, { $set : { approveStatus : true }})
        await ClassList.updateOne({ _id : classRegisterInfoClassId }, { $set : { userList : classUserList }});

        res.json({ msg: 'success' })

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

// 교육신청 승인 대기 리스트 
router.get('/classApply', authMiddleware, async(req, res) => { 
    const user = res.locals.user;
    try{
        let classRegisterWaitingList;
        let myClassList;
        let myClassListId= [];
        let items = [];
        let temp = {};
        let total;

        myClassList = await ClassList.find({ userId : user._id, approveStatus : true});

        for (let i=0; i < myClassList.length; i++ ) {
            myClassListId.push(myClassList[i]._id);
        }


        for (let i=0; i < myClassListId.length; i++ ){
            
            classRegisterWaitingList = await ClassRegister.find({ approveStatus : false, classId : {$in: myClassListId[i] }}, { createdAt: false, updatedAt: false, id: false });

            let userInfo = await User.findOne({ _id : classRegisterWaitingList.userId})
            temp = {
                approveStatus : classRegisterWaitingList[0].approveStatus,
                userId : classRegisterWaitingList[0].userId,
                classId: classRegisterWaitingList[0].classId,
                name : userInfo.name,
                profileImg: userInfo.profileImg,
                introduce: userInfo.introduce,
                phoneNumber: userInfo.phoneNumber 
            }

            if (classRegisterWaitingList.length > 0){
                items.push(temp);
            }
        }

        total = items.length;


        res.json({ msg: 'success', items, total });

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

// 교육 취소
router.delete('/classApply', authMiddleware, async(req, res) => {
    //const user = res.locals.user;
    try{
        const { classId, userId } = req.body;
        let classesList = await ClassList.findOne({ _id: classId })
        let availableCount = classesList.availableCnt;
        console.log(classesList, 'ho', availableCount)
        classesList['userList'].deleteOne({ userId: userId });
        await classesList.save();
        await ClassList.update({ _id: classId }, {$inc: { currentAvailableCnt : +1 } });

        res.json({ msg : 'success'})
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

// 교육 등록
router.post('/register', authMiddleware, multer.fields([{ name: 'classPicture', maxCount: 10}, { name: 'teacherImg', maxCount:10 }]), authMiddleware, async(req, res) => {
    const user = res.locals.user;
    try{
        if(user.status !== 'admin'){
            return res.json({ msg: "register admin"})
        }

        console.log('req.body', req.body);
        let classEndTimeInfo = req.body.classEndTime;
        let classStartTimeInfo = req.body.classStartTime;
        console.log('classStartTimeInfo', classStartTimeInfo)
        console.log('classEndTImeInfo', classEndTimeInfo)

        let result = {
            category: req.body.category,
            classTitle: req.body.classTitle,
            classIntroduce: req.body.classIntroduce,
            classPicture:  req.files.classPicture[0].transforms[0].location,
            availableCnt: req.body.availableCnt,
            classPlace: req.body.classPlace,
            classDay: req.body.classDay,
            classStartTime: classStartTimeInfo,
            classEndTime: classEndTimeInfo,
            teacherName: req.body.teacherName,
            teacherImg: req.files.teacherImg[0].transforms[0].location,
            userId : user._id,
        }
        await ClassList.create(result);
        
        res.json({ msg: 'success', result: result });
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'error' })
    }
})

// 교육 상세 등록 
router.post('/detail/:classId', multer.single('teacherImg'), authMiddleware, async(req, res) => {
    const user = res.locals.user;
    const classId = req.params.classId;
    try{
        console.log('req.file', req.file);
        let originalClassInfo = await ClassList.findOne({ _id: classId })

        let result = {
            category: originalClassInfo.category,
            classTitle: originalClassInfo.classTitle,
            classIntroduce: originalClassInfo.classIntroduce,
            classPicture:  originalClassInfo.classPicture,
            classPlace: originalClassInfo.classPlace,
            classDay: req.body.classDay,
            classStartTime: req.body.classStartTime,
            classEndTime: req.body.classEndTime,
            availableCnt: req.body.availableCnt,
            teacherName: req.body.teacherName,
            teacherImg: req.file.transforms[0].location,
            userId : user._id,
        }
        await ClassList.create(result);
        
        res.json({ msg: 'success', result: result });
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'error' })
    }
})

// 교육 등록 승인
router.post('/approve/:classId', authMiddleware, async(req, res) => { 
    const user = res.locals.user;
    const classId = req.params.classId;
    console.log(classId);
    try{
        if(user.approveStatus == true){
            return res.json({ msg: 'not yet approved'})
        }

        await ClassList.updateOne({ _id : classId }, { $set : { approveStatus : true }})
        res.json({ msg: 'success' })

    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

module.exports = router;
