var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    roomNum: {type: String, required: true },
    building: {type: String, required: true },
    capacity: {type: String, },
});

// virtual for url
RoomSchema
.virtual('url')
.get(function() {
    return '/catalog/room/' + this._id;
});

RoomSchema
.virtual('Location')
.get(function() {
	return "Room " + this.roomNum + ": " + this.building;
});
//export
module.exports = mongoose.model('Room', RoomSchema);