const mongoose = require('mongoose');
const { Schema } = mongoose;

const classList = new Schema(
	{
		classTitle: { type: String, required: true },
		classDate: { type: String, required: true },
		classTime: { type: String, required: true },
        category: { type: String, required: true },
        availableCnt: { type: String, required: true },
        teacherImg: {
			type: String,
			required: true,
			default:
				'https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg'
		},
        teacherName: { type: String, required: true },
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
