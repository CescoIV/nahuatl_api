var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	local_id:String,
	knownWords:Array,
	username: String,
})

var User = mongoose.model('User', userSchema);

module.exports = User;