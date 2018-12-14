var Room = require('../models/Room');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list.
exports.room_list = function(req, res, next) {
    Room.find()
    .sort([['lastName', 'ascending']])
    .exec(function (err, list_rooms) {
        if (err) { return next(err)};
        res.render('room_list', { title: 'Rooms', room_list: list_rooms});
    });
};

// Display detail page.
exports.room_detail = function(req, res) {
    
	 Room.findById(req.params.id).exec(function (err, room)
	{
		if (err) { return next(err); }
		if (room==null) { // No results.
			var err = new Error('Room not found');
			err.status = 404;
			return next(err);
        }
		res.render('room_detail', { title: 'Room Details', room: room})
	});
};

// Display  create form on GET.
exports.room_create_get = function(req, res) {
    res.render('room_create', { title: 'Add A Room'});
};

// Handle  create on POST.
exports.room_create_post = [
	//validate fields
	body('roomNum').isLength({ min: 1 }).trim().withMessage('The room number is required.').isAlphanumeric().withMessage('Room Number must be alphanumeric'),
	body('building').isLength({min:1}).trim().withMessage('The building must be specified').isAlphanumeric().withMessage('Special Characters are not allowed.'),
	body('capacity').trim().isNumeric().withMessage('Capacity must be a number.'),
	
	//sanitize
	sanitizeBody('roomNum').trim().escape(),
    sanitizeBody('building').trim().escape(),
	sanitizeBody('capacity').trim().escape(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('room_create', { title: 'Add A Room', data: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var room = new Room(
                {
                    roomNum: req.body.roomNum,
                    building: req.body.building,
					capacity: req.body.capacity
                });
            room.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(room.url);
            });
        }
	}
];

// Display delete form on GET.
exports.room_delete_get = function(req, res) {
    
	Room.findById(req.params.id).exec(function (err, room)
	{
		if (err) { return next(err); }
		if (room==null) { // No results.
			res.redirect('/catalog/room/');
        }
		res.render('room_delete', { title: 'Delete Room', room: room})
	});
};

// Handle delete on POST.
exports.room_delete_post = function(req, res) {
    
	Room.findByIdAndRemove(req.params.id, function deleteRoom(err) {
		if (err) {return next(err); }
		res.redirect('/catalog/room')
	});
};

// Display update form on GET.
exports.room_update_get = function(req, res) {
    
	Room.findById(req.params.id).exec(function (err, room)
	{
		if (err) { return next(err); }
		if (room==null) { // No results.
			res.redirect('/catalog/room/');
        }
		res.render('room_form', { title: 'Update Room', roomNum: room.roomNum, building: room.building, capacity: room.capacity, _id: room._id })
	});
};

// Handle update on POST.
exports.room_update_post = [
    
	body('roomNum').isLength({ min: 1 }).trim().withMessage('The room number is required.').isAlphanumeric().withMessage('Room Number must be alphanumeric'),
	body('building').isLength({min:1}).trim().withMessage('The building must be specified').isAlphanumeric().withMessage('Special Characters are not allowed.'),
	body('capacity').trim().isNumeric().withMessage('Capacity must be a number.'),
	
	//sanitize
	sanitizeBody('roomNum').trim().escape(),
    sanitizeBody('building').trim().escape(),
	sanitizeBody('capacity').trim().escape(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('room_form', { title: 'Update Room', roomNum: req.body.roomNum, building: req.body.building, capacity: req.body.capacity, _id: req.body._id, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var room = new Room(
                {
                    roomNum: req.body.roomNum,
                    building: req.body.building,
					capacity: req.body.capacity,
					_id: req.params.id
                });
            Room.findByIdAndUpdate(req.params.id, room, {}, function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(room.url);
            });
        }
	}
];