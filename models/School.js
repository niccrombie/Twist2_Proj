var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
    hs_id: {type: String, required: true,},
    hsName: {type: String, }
});

// virtual for url
SchoolSchema
.virtual('url')
.get(function() {
    return '/catalog/school/' + this._id;
});

//virtual for Description
SchoolSchema
.virtual('School')
.get(function() {
	return "USD " + this.hs_id + ": " + this.hsName;
});

//export
module.exports = mongoose.model('School', SchoolSchema);