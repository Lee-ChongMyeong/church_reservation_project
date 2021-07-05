const express = require('express');
const router = express.Router();
const {
	Book,
    ClassList,
    Material,
    User
} = require('../models');
const authMiddleware = require('../auth/authMiddleware');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mongoose = require('mongoose');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
require('dotenv').config();

// 교육 리스트 
router.get('/', async(req, res) => {
    let result = { msg: 'success', classLists: [] };
    try{
        let classes = await ClassList.find({ })
        result['classLists'].push(classes);
    }catch(err){
        result['msg'] = 'error';
    }
    res.json({ msg: 'success', result : result})
})

// 교육 신청
router.post('/classApply', async(req, res) => {
    //const user = res.locals.user;
    try{
        const { classId, userId } = req.body;
        let classesList = await ClassList.findOne({ _id: classId })
        console.log(classesList)
        let availableCount = classesList.availableCnt;
        console.log(classesList, 'ho', availableCount)
        classesList['userList'].push(userId);
        await classesList.save();
        await ClassList.update({ _id: classId }, {$inc: { currentAvailableCnt : -1 } });

        res.json({ msg : 'success'})
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }
});

// 교육 취소
router.delete('/classApply', async(req, res) => {
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
router.post('/register', async(req, res) => {
    //const user = res.locals.user;
    try{
        // if(user.nickname !== '관리자'){
        //     return res.json({ msg: "fail"})
        // }
        let result = {
            category: req.body.category,
            classDate: req.body.classDate,
            classTime: req.body.classTime,
            classTitle: req.body.classTitle,
            availableCnt: req.body.availableCnt,
            currentAvailableCnt : req.body.availableCnt,
            teacherName: req.body.teacherName,
            churchName: req.body.churchName
        }
        let result2 = await ClassList.create(result);
        res.json({ msg: 'success', result: result });
    }catch(err){
        console.log('err', err)
        res.json({ msg : 'error' })
    }
})



module.exports = router;
