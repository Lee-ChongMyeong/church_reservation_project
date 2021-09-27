const express = require('express');
const router = express.Router();
const {
	Book,
    Lesson,
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

router.get('/classList', )

module.exports = router;
