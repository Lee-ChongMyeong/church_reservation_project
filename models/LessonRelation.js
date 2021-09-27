const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonRelation = new Schema(
	{
        userId: { type: String, required: true },
        classId : { type: String, required: true},
        approveStatus: { type: Boolean, default: false },
	},
	{ timestamps: true, versionKey : false },
  );

lessonRelation.virtual('registerId').get(function () {
	return this._id.toHexString();
});

lessonRelation.set('toObject', {
	virtuals: true
});
lessonRelation.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Lesson_Relation', lessonRelation);


// 수업 신청 할때 대기 리스트
