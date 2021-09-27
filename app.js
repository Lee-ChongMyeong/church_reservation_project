const express = require('express');
const app = express();
const { Server } = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./src/swagger')
const swaggerSpec = swaggerJsdoc(swaggerDocument);

require('./models/mongoose');
require('./models/mongoose');
require('dotenv').config();

const cors = require('cors');
app.use(cors({ origin: '*', credentials: true }));

// 미들웨어
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const passport = require('./auth/passport');
app.use(passport.initialize());

const http = Server(app);



// swagger
app.use('/', require('./services'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true }));

http.listen(process.env.EXPRESS_PORT, () => {
	console.log(`Listening at http://localhost:${process.env.EXPRESS_PORT}`);
});
