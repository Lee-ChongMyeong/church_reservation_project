const express = require('express');
const router = express.Router();


// router.use('/auth', require('./auth'));
// router.use('/classList', require('./classList'));
// router.use('/mypage', require('./mypage'));
// router.use('/book', require('./book'));
// router.use('/login', require('./login'));

router.use('/', require('./user/UserService'))
router.use('/', require('./lesson/LessonService'))
router.use('/', require('./passport/PassportService'))
router.use('/', require('./manager/ManagerService'))

module.exports = router;