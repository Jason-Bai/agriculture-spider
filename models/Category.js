var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
	level: Number,
	isDelete: Number,
	parentId: Schema.Types.ObjectId,
	createdAt: Date,
	updatedAt: Date
}, {
	versionKey: false
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
