var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    sessionNum: {type: Number, required: true},
    time: {type: String, required: true}
});

// virtual for url
SessionSchema
.virtual('url')
.get(function() {
    return '/catalog/session/' + this._id;
});

//virtual for Description
SessionSchema
.virtual('Session')
.get(function() {
	return "Session " + this.sessionNum + ": " + this.time;
});

//export
module.exports = mongoose.model('Session', SessionSchema);