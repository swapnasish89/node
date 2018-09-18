var mongoose = require('mongoose');
var schema = mongoose.Schema;

var storySchema = new schema({
	creator : { Schema.Types.ObjectId, ref :'user'},
	content : String,
	created : {type : Date, defauly : Date.now }
});

module.export = mongoose.model('story', storySchema);