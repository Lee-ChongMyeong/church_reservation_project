const mongoose = require('mongoose');
const { Schema } = mongoose;

const approve = new Schema(
	{
		name: {type: String, required: true},
		classPlace: { type: String, required: true},
		phoneNumber : { type: String, required: true },
		introduce: { type: String, required: true },
        userId: { type: String, required: true },
	},
	{ timestamps: true, versionKey : false },
  );

approve.virtual('approveId').get(function () {
	return this._id.toHexString();
});

approve.set('toObject', {
	virtuals: true
});
approve.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Approve', approve);



