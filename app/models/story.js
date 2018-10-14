var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var storySchema = new Schema({
	creator : { type: Schema.Types.ObjectId, ref :'user'},
	content : String,
	created : {type : Date, default : Date.now }
});

module.exports = mongoose.model('Story', storySchema);
