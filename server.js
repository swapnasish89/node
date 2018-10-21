var config = require('./config');
var http = require('./applicationConfig');


http.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Listening on port ' + config.port);
	}
});