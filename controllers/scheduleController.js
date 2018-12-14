var Schedule = require('../models/Schedule');
var async = require('async');
var Topic = require('../models/Topic');
var Session = require('../models/Session');
var Room = require('../models/Room');
var Presenter = require('../models/Presenter');
var Participant = require('../models/Participant');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res) {   
    
	//This goes through each Model in the database and counts the number of objects associated with each model.
    async.parallel({
        Session_count: function(callback) {
            Session.countDocuments({}, callback);
        },
        Topic_count: function(callback) {
            Topic.countDocuments({}, callback);
        },
        Room_count: function(callback) {
            Room.countDocuments({}, callback);
        },
        Presenter_count: function(callback) {
            Presenter.countDocuments({}, callback);
        },
    }, function(err, results) {
        res.render('schedule', { title: 'Twist Schedule', error: err, data: results });
    });
};

// Display table with list of data
exports.schedule_list = function(req, res) {
	
	async.parallel({
		session: function(callback) {
			Session.find({},'sessionNum').exec(callback);
		},
		room: function(callback) {
			Room.find({}, 'roomNum').exec(callback);
		},
		topic: function(callback) {
			Topic.find({}, 'title').exec(callback);
		},
		presenter: function(callback) {
			Presenter.find({}, 'firstName lastName').exec(callback);
		},
		students: function(callback) {
			Participant.find({}, 'firstName lastName').exec(callback);
		}
	}, function (err, results) {
		if (err) { return next(err);}
		console.log(results);
		res.render('schedule_list', { title: 'Schedule', error: err, sessions: results.session, rooms: results.room, topics: results.topic, presenters: results.presenter, students: results.students })
	})
};

// Display detail page.
exports.schedule_detail = function(req, res) {
    async.parallel(
	{
		schedule: function(callback) {
			Schedule.findById(req.params.id)
			.populate('sessionNum')
			.populate('topicCode')
			.populate('presenter_id')
			.populate('roomNum').exec(callback);
        },
		session: function(callback) {
			Schedule.find({ 'sessionNum': req.params.id }).exec(callback);
		},
		topic: function(callback) {
			Schedule.find({'topicCode': req.params.id}).exec(callback);
		},
		presenter: function(callback) {
			Schedule.find({'presenter_id': req.params.id}).exec(callback);
		},
		room: function(callback) {
			Schedule.find({'roomNum': req.params.id}).exec(callback);
		},
	}), function(err, results) {
		if (err) { return next(err); }
		if (results.schedule==null) { // No results.
            var err = new Error('Schedule not found');
            err.status = 404;
            return next(err);
        }
        res.render('schedule_list', { title: 'Twist Schedule'})//, session: results.session, topic: results.topic, presenter: results.presenter, room: results.room});
	
        //topic: topic,
        //presenter: presenter
	};
};

// Display  create form on GET.
exports.schedule_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: create GET');
};

// Handle  create on POST.
exports.schedule_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: create POST');
};

// Display delete form on GET.
exports.schedule_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: delete GET');
};

// Handle delete on POST.
exports.schedule_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: delete POST');
};

// Display update form on GET.
exports.schedule_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: update GET');
};

// Handle update on POST.
exports.schedule_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: update POST');
};