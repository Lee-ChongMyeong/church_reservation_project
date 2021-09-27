const mongoose = require('mongoose');
const { Schema } = mongoose;

const manager = new Schema(
	{
		name: {type: String, required: true},
		classPlace: { type: String, required: true},
		phoneNumber : { type: String, required: true },
		introduce: { type: String, required: true },
        userId: { type: String, required: true },
	},
	{ timestamps: true, versionKey : false },
  );

manager.virtual('approveId').get(function () {
	return this._id.toHexString();
});

manager.set('toObject', {
	virtuals: true
});
manager.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Manager', manager);

// manager 로 테이블 변경 필요

