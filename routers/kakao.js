const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sanitizeHtml = require('sanitize-html');
const crypto = require('crypto');
const {
    Book,
    ClassList,
    Material,
    User
} = require('../models');
require('dotenv').config();

router.get('/oauth/authorize?client_id=68a1e51e217b3f360767faf6c34f4b03&redirect_uri=http://localhost:3000/oauth&response_type=code', async(req, res) => {

})

router.post('/oauth/token', async(req, res) => {
    try{

    }catch(err){
        console.log('err', err)
        res.json({ msg : 'fail'})
    }

})

module.exports = router;

