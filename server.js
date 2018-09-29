var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(express.static(__dirname + '/public'));

mongoose.connect(config.database,{ useNewUrlParser: true }, function(err){
	if(err){
		console.log(err);
	} 

	console.log('Database Connected ');
});


var api = require('./app/routes/api')(app, express);
app.use("/api",api);

app.get('/*', function(req, res){
	res.sendFile(__dirname + "/public/app/views/index.html");
});

app.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Listening on port ' + config.port);
	}
});