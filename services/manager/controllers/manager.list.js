const express = require('express');
const router = express.Router();
const {Register, User, Approve} = require('../../../models');
const sanitize = require('../../../lib/sanitizeHtml');
const authMiddleware = require('../../../auth/authMiddleware');


// 교회 단체 승인 리스트
router.get('/approve', authMiddleware, async(req, res) => {

    try{
        const approveInfo = await Approve.find({ }).select('name classPlace phoneNumber introduce userId ')
    
        res.json({ msg: 'success', approveInfo: approveInfo })  
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});

/**
 * @swagger
 * /manager:
 *   get:
 *     summary: 교회 단체 승인 리스트 (admin)
 *     tags: [manager]
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 */

module.exports = router;