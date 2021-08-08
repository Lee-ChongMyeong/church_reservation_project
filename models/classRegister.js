const mongoose = require('mongoose');
const { Schema } = mongoose;

const classRegister = new Schema(
	{
        userId: { type: String, required: true },
        classId : { type: String, required: true},
        approveStatus: { type: Boolean, default: false },
	},
	{ timestamps: true, versionKey : false },
  );

classRegister.virtual('registerId').get(function () {
	return this._id.toHexString();
});

classRegister.set('toObject', {
	virtuals: true
});
classRegister.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('ClassRegister', classRegister);



