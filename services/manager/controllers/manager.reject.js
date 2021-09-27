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


// 교회 단체 등록 거절
router.delete('/reject/:userId', authMiddleware, async(req, res) => {
    const userId = req.params.userId;
    const user = res.locals.user;
    try{

        const userInfo = await User.findOne({ _id : userId });
        // console.log('userInfo', userInfo);
        await User.updateOne({ _id : userId }, { $set : { applyStatus : false }});
        await ManagerRelation.deleteMany({ userId : userId })
        
        res.json({ msg: 'success' })   
    }catch(err){
        console.log(err);
		res.status(400).json({ msg: 'fail'})
    }
})

/**
 * @swagger
 * /manager/reject/{gid}:
 *   delete:
 *     summary: 교회 단체 등록 거절 (admin)
 *     security:
 *       - jwt: []
 *     tags: [manager]
 *     parameters:
 *       - in: path
 *         name: User Id
 *         schema:
 *           type: string
 *         required: true
 *         description: User Id
 * 
 *     responses:
 *       200:
 *         description: A successful response
 */

module.exports = router;