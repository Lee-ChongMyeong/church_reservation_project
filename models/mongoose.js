const mongoose = require('mongoose');
require('dotenv').config();
mongoose
	.connect(`mongodb://${process.env.MONGO_URL}/${process.env.MONGO_DB}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
		ignoreUndefined: true,
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASS
	})
	.catch((err) => console.error(err));

mongoose.connection.on('error', (err) => {
	console.error('몽고디비 연결 에러', err);
});

module.exports = mongoose;
