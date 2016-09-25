var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  belong: String,
  hidden: Boolean,
  level: Number,
  subs: [Schema.Types.Mixed]
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
