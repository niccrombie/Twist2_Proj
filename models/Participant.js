var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
    lastName: {type: String, max: 100},
    firstName: {type: String, max: 100},
    address: {type: String},
    email: {type: String},
    timeStamp: {type: Date, default: Date.now, },
    participantType: {type: String},
	school: {type: Schema.Types.ObjectId, ref: 'School', required: true},
	interests: {type: Schema.Types.ObjectId, ref: 'Topic', required: true}
  });

// Virtual for participants full name
ParticipantSchema
.virtual('name')
.get(function () {
  return this.lastName + ', ' + this.firstName;
});

// Virtual for Participants URL
ParticipantSchema
.virtual('url')
.get(function () {
  return '/catalog/participant/' + this._id;
});

//Export model
module.exports = mongoose.model('Participant', ParticipantSchema);