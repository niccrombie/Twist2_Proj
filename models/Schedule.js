var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleSchema = new Schema({
    sessionNum: {type: Schema.Types.ObjectId, ref: 'Session', required: true}, // FROM SESSION MODEL
    roomNum: {type: Schema.Types.ObjectId, ref: 'Room', required: true }, // FROM ROOM MODEL
    topicCode: {type: Schema.Types.ObjectId, ref: 'Topic', required: true },  // FROM TOPIC MODEL
    presenter_id: {type: Schema.Types.ObjectId, ref: 'Presenter', required: true }, // FROM PRESENTER MODEL
	//maxSize: {type: Number, required: true}, //the maximum number of participants that can be placed in each session on the schedule.
});

// virtual for url
ScheduleSchema
.virtual('url')
.get(function() {
    return '/catalog/schedule/' + this._id;
});

ScheduleSchema
.virtual('topics')
.get(function() {
	return '/catalog/topic/' + Topic.topicCode;
})
//export
module.exports = mongoose.model('Schedule', ScheduleSchema);