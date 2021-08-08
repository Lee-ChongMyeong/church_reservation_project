const mongoose = require('mongoose');
const { Schema } = mongoose;

const book = new Schema(
	{
		bookTitle: { type: String, required: true },
		bookCategory: { type: String, required: true },
		bookImg: { type: String, required: true },
	},
	{ timestamps: true, versionKey : false }
  );

book.virtual('bookId').get(function () {
	return this._id.toHexString();
});

book.set('toObject', {
	virtuals: true
});
book.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Book', book);
