const express = require('express');
require('./models/mongoose');
const { Server } = require('http');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({ origin: '*', credentials: true }));


// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// const passport = require('./auth/passport');
// app.use(passport.initialize());
const http = Server(app);

app.use('/', require('./routers'));

http.listen(process.env.LOVE_PORT, () => {
	console.log(`Listening at http://localhost:${process.env.EXPRESS_PORT}`);
});
