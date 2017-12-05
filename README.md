##What is this?
The Nahuatl API is an experimental attempt at tracking the Nahuatl language. 
Nahuatl is the largest language spoken in Mexico with around 1.7 million speakers.
Nonetheless finding resources to learn the language online is difficult as it is 
overshadowed by more internationally established languages and few standardized sources
exist for it in the development world. This is an experiment to alleviate that.

##How do I use this API 

The API currently lives at http://nahuatl-api.herokuapp.com/
It currently supports Post, Patch and Get requests to the word database.

##Here are the Routes to use:

##GET:
Get all words(word schema)in the API:
http://nahuatl-api.herokuapp.com/language/nahuatl/words

Find a word by searching for it in Nahuatl:
http://nahuatl-api.herokuapp.com/language/nahuatl/words/:word

Find a word by searching for it in English:
http://nahuatl-api.herokuapp.com/language/nahuatl/words/en/:word

##POST

Post a word in Nahuatl to the API:
http://nahuatl-api.herokuapp.com/language/nahuatl/words

Use the following JSON object in the body for guidance:

{
	"word_native": String(Native word),
	"word_english": String(english translation),
	"correct_responses": Array(other possible translations/english synonyms of word_english),
	"source": String(Where is this word from? Slang? Classical Nahuatl? Veracruz dialect? etc.)
}

##PATCH

Find a word by its Nahuatl spelling and patch its object:

http://nahuatl-api.herokuapp.com/language/nahuatl/words/:word

Use the following JSON object in the body for guidance:

{
	"word_native": String(Native word),
	"word_english": String(english translation),
	"correct_responses": Array(other possible translations/english synonyms of word_english),
	"source": String(Where is this word from? Slang? Classical Nahuatl? Veracruz dialect? etc.)
}