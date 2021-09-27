const mongoose = require('mongoose');
const { Schema } = mongoose;

const managerRelation = new Schema(
	{
		name: {type: String, required: true},
		classPlace: { type: String, required: true},
		phoneNumber : { type: String, required: true },
		introduce: { type: String, required: true },
        userId: { type: String, required: true },
	},
	{ timestamps: true, versionKey : false }
);

managerRelation.virtual('registerId').get(function () {
	return this._id.toHexString();
});

managerRelation.set('toObject', {
	virtuals: true
});
managerRelation.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Manager_Relation', managerRelation);

// manager 등록 대기중
