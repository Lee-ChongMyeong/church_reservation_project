const express = require('express');
const app = express();
require('./models/mongoose');
const { Server } = require('http');
require('./models/mongoose');
require('dotenv').config();

const cors = require('cors');
app.use(cors({ origin: '*', credentials: true }));

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const passport = require('./auth/passport');
app.use(passport.initialize());

// const passport = require('./auth/passport');
// app.use(passport.initialize());
const http = Server(app);

app.use('/', require('./routers'));

http.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Listening at http://localhost:${process.env.EXPRESS_PORT}`);
});
