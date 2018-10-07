var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database,{ useNewUrlParser: true }, function(err){
	if(err){
		console.log(err);
	} 

	console.log('Database Connected ');
});