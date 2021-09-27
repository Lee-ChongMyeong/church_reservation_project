const express = require('express');
const router = express.Router();
const {
    Book,
    Lesson,
    Manager,
    Material,
    User,
    ManagerRelation,
    LessonRelation
} = require('../../../models');
const sanitize = require('../../../lib/sanitizeHtml');
const authMiddleware = require('../../../auth/authMiddleware');


// 교회 단체 승인 리스트
router.get('/approve', authMiddleware, async(req, res) => {

    let items, total, data = {};

    try{
        const approveInfo = await Manager.find({ }).select('name classPlace phoneNumber introduce userId ')
    
        data = {
            items: approveInfo,
            total: approveInfo.length
        }

        res.json({ msg: 'success', data})  
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});

/**
 * @swagger
 * /manager/approve:
 *   get:
 *     summary: 교회 단체 승인 리스트 (admin)
 *     tags: [manager]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 */

module.exports = router;