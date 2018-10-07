var config = require('./config');
var app = require('./applicationConfig');

app.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Listening on port ' + config.port);
	}
});