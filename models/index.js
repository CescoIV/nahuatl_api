const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./user');
const Word = require('./word');

module.exports={
	User: User,
	Word: Word,
}