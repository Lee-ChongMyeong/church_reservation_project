const express = require('express');
const router = express.Router();
const {
    ManagerRelation
} = require('../../../models');
const sanitize = require('../../../lib/sanitizeHtml');
const authMiddleware = require('../../../auth/authMiddleware');

// 교회 등록 대기 리스트
router.get('/pending', authMiddleware, async(req, res) => {
    const user = res.locals.user;
    let items, total, data = {};
    try{
        const waitingList = await ManagerRelation.find().select('name classPlace phoneNumber introduce userId ')
        
        data = {
            items: waitingList,
            total: waitingList.length
        }

        res.json({ msg: 'success', data });
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
});

/**
 * @swagger
 * /manager/pending:
 *   get:
 *     summary: 교회 단체 등록 대기 리스트 (admin)
 *     security:
 *       - jwt: []
 *     tags: [manager]
 *     responses:
 *       200:
 *         description: A successful response
 *         contens:
 *           application/json:
 *             schema:
 */

module.exports = router;