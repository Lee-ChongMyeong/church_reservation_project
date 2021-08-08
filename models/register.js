const mongoose = require('mongoose');
const { Schema } = mongoose;

const register = new Schema(
	{
		name: {type: String, required: true},
		classPlace: { type: String, required: true},
		phoneNumber : { type: String, required: true },
		introduce: { type: String, required: true },
        userId: { type: String, required: true },
	},
	{ timestamps: true, versionKey : false }
);

register.virtual('registerId').get(function () {
	return this._id.toHexString();
});

register.set('toObject', {
	virtuals: true
});
register.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Register', register);



