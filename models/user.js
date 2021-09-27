const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);
const { Schema } = mongoose;

const user = new Schema(
	{
		name: { type: String, required: true },
		user_id: { type: Number, default: 0},
		nickname: { type: String, default:'' },
		socialId: { type: String },
		profileImg: {
			type: String,
			default:
				'https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg'
		},
		introduce: { type: String, default: '' },
        churchName: { type: String, default: '' },
        churchDuty: { type: String, default: '' },
		status: { type: String, default: 'user' },
		job: { type: String, default: '' },
        phoneNumber: { type: String, default: '' },
		provider: { type: String },
		first: { type: Boolean, default: true },
		applyStatus: { type: Boolean, default: false },
		classPlace: {type: Array }
	},
	{ timestamps: true, versionKey : false },
);

user.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'user_id',
    startAt: 0, //시작
    increment: 1 // 증가
});

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