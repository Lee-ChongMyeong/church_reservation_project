const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema(
	{
		id: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		nickname: { type: String, required: true },
		socialId: { type: String },
		profileImg: {
			type: String,
			default:
				'https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg'
		},
		introduce: { type: String, default: '' },
        churchName: { type: String, default: '' },
        churchDuty: { type: String, default: '' },
		job: { type: String, default: '' },
        phoneNumber: { type: String, default: '' }
        
	},
	{ timestamps: true }
);

user.virtual('userId').get(function () {
	return this._id.toHexString();
});

user.set('toObject', {
	virtuals: true
});
user.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('User', user);
