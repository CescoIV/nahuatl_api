const mongoose = require('mongoose');
const express = require('express');
const db = require('./models');
require('dotenv').config();
var bodyParser = require('body-parser');

//APP SETUP
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//fix promise bug
mongoose.Promise = global.Promise;
//connect to mongoDB
mongoose.connection.openUri(process.env.MONGODB_URI || process.env.DB_CONN, {}, function(err,con){
	if(err){
		console.log('Error connecting to Mongo DB.', err);
	}else{
		console.log('Mongoose successfully connected to MongoDB.');
	}
});

//ROUTES
app.get('/', function(req,res){
	res.send(`
		Welcome to the Nahuatl API. 
		This is an experimental, open API for use with the Study-Nahuatl app.
		Check: https://github.com/CescoIV/nahuatl_api.
		Currently our data is not curated! Check  the github repository
		read me for routes/ more information.
		`);
})
//USER ROUTES
app.get('/users/:username', function(req,res){
	let username = req.params.username;
	console.log(username);
	db.User.findOne({username: username}, function(err,data){
		if(err){
			console.log(err, 'could not find user');
		}else{
			res.send(data);
		}
	})
})
app.post('/users', function(req,res){
	var newUser= db.User({
		id: req.body.id,
		knownWords: req.body.knownWords,
		username: req.body.username
	})

	newUser.save(function(err,user){
		if(err){
			console.log(err)
		}else{
			res.status(201).json(user);
		}
	})
})
app.patch('/users/:username/:word', function(req,res){
	//finds user,gets their words, if word exists,it lets you know,else it updates the user with the new word.
	let username = req.params.username;
	let word = req.params.word;
	db.User.findOne({username: username}, function(err,data){
		let response = '';
		if(err){
			console.log(err, "could not find user");
		}else{
			console.log('found user', data);
			if(data.knownWords){
				if(data.knownWords.includes(word)){
					response = 'user already knows word' + word;
				}else{
					data.knownWords.push(word);
					console.log('Your word is about to update', data)
					response = 'Your word has been saved';
				}
			}else{
				console.log('Could not find words array');
			}
			console.log(data.knownWords);
			console.log(data);
			res.send(response + " " + data);
		}
		data.save(function(err,savedUser){
			if(err){
				console.log('could not save user');
			}else{
				console.log('User saved!', savedUser)
			}
		});
	});
})
//WORD ROUTES
app.get('/language/nahuatl/words', function(req,res){
	//get all words in database
	db.Word.find({},function(err,data){
		if(err){
			console.log('could not get words');
		}else{
			res.send(data);
		}
	})
})
app.get('/language/nahuatl/words/:word',(req,res)=>{
	//search nahuatl word
	db.Word.find({word_native: req.params.word}, (err,data)=>{
		if(err){
			console.log(err);
		}else{
			res.send('201',data);
		}
	})
})
app.get('/language/nahuatl/words/en/:word',(req,res)=>{
	//search english word
	db.Word.find({word_english: req.params.word}, (err,data)=>{
		if(err){
			console.log(err);
		}else{
			res.send('201',data);
		}
	})
})
app.post('/language/nahuatl/words',function(req,res){
	var newWord = db.Word({
		word_native: req.body.word_native,
		word_english: req.body.word_english,
		correct_responses: req.body.correct_responses,
	})
	newWord.save(function(err,word){
		if(err){
			console.log(err);
		}else{
			res.status(201).json(word);
		}
	})
})
app.patch('/language/nahuatl/words/:word', (req,res)=>{
	db.Word.findOneAndUpdate({word_native: req.body.word_native}, {"$set": {
		"word_native": req.body.word_native,
		"word_english": req.body.word_english,
		"correct_responses": req.body.correct_responses,
		"source": req.body.source,
	}}).exec((err,response)=>{
		if(err){
			console.log(err);
		}else{
			res.status(201).json(response);
		}
	})
});

app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
})