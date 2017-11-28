var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
	word_native:String,
	word_english:String,
	correct_responses: Array,
})

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;