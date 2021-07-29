const mongoose = require('mongoose');
const { Schema } = mongoose;

const classList = new Schema(
	{
        category: { type: String, required: true },
		classTitle: { type: String, required: true },
		classIntroduce: { type: String, required: true },
		classPicture: { 
			type: String,
			// required: true,
			default:
				'https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg'
		 },
		availableCnt: { type: String, required: true },
		classPlace: { type: String, required: true },
        classDay: { type: Array, required: true},
		classStartTime: { type: Array, required: true},
		classEndTime: { type: Array, reqiuired: true },
		teacherImg: {
			type: String,
			// required: true,
			default:
				'https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg'
		},
        teacherName: { type: String, required: true },
		approveStatus: { type: Boolean, default: false },
		userList : {type: Array, required: true },
		userId : {type: String, required: true}
	},
	{ timestamps: true }
);

classList.virtual('classId').get(function () {
	return this._id.toHexString();
});

classList.set('toObject', {
	virtuals: true
});
classList.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('ClassList', classList);
