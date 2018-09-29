var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
	creator : { type: Schema.Types.ObjectId, ref :'user'},
	content : String,
	created : {type : Date, defauly : Date.now }
});

module.export = mongoose.model('story', storySchema);