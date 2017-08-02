var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	author: { type: String, lowercase: true, required: true },
	description: { type: String, default: 'Описание отсутствует.' },
	src: { type: String, required: true, unique: true},
	uploadTime: {type: Date, default: new Date }
});

module.exports = mongoose.model('Post', PostSchema);