const mongoose = require('mongoose');
const { Schema } = mongoose;

const material = new Schema(
	{
		materialTitle: { type: String, required: true },
		materialFile: { type: String, required: true },
		date: { type: String, required: true },
	},
	{ timestamps: true, versionKey : false }
  );

material.virtual('materialId').get(function () {
	return this._id.toHexString();
});

material.set('toObject', {
	virtuals: true
});
material.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Material', material);
