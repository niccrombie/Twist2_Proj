var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PresenterSchema = new Schema({
    lastName: {type: String, required: true,},
    firstName: {type: String, },
    occupation: {type: String, },
    topic: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
    mainPhone: {type: String, },
    mobilePhone: {type: String, },
    email: {type: String, },
});

// virtual for url
PresenterSchema
.virtual('name')
.get(function() {
	return this.lastName + ", " + this.firstName;
});

PresenterSchema
.virtual('url')
.get(function() {
    return '/catalog/Presenter/' + this._id;
});


//export
module.exports = mongoose.model('Presenter', PresenterSchema);