const express = require('express');
const router = express.Router();


router.use('/', require('./user/UserService'))
router.use('/', require('./lesson/LessonService'))
router.use('/', require('./passport/PassportService'))
router.use('/', require('./manager/ManagerService'))

module.exports = router;