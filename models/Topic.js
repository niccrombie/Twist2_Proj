var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    topicCode: {type: String, required: true,},
    title: {type: String, },
    description: {type: String, max: 100, default: 'asdf'},
});

// virtual for url
TopicSchema
.virtual('topic')
.get(function() {
	return this.title + ': ' + this.description;
});

TopicSchema
.virtual('url')
.get(function() {
    return '/catalog/Topic/' + this._id;
});
//export
module.exports = mongoose.model('Topic', TopicSchema);