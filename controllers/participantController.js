var Participant = require('../models/Participant');
var Topic = require('../models/Topic');
var School = require('../models/School');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display all.
exports.participant_list = function(req, res, next) {
    Participant.find()
    .sort([['lastName', 'ascending']])
    .exec(function (err, list_participants) {
        if (err) { return next(err)};
        res.render('participant_list', { title: 'Participants', participant_list: list_participants});
    });
};

// Display details
exports.participant_detail = function(req,res,next) {
    Participant.findById(req.params.id)
    .exec(function (err, results) {
        if (err) { return next(err);}
            if (results==null) {
                var err = new Error('Participant not found');
                err.status = 404;
                return next(err)
        }
			console.log(results);
        res.render('participant_detail', { title: "Participant Details", participant: results,})
    });
};

// Display Create form on Get
exports.participant_create_get = function(req, res) {
	async.parallel({
		topic: function(callback) {
			Topic.find({},'title').exec(callback);
		},
		school: function(callback) {
			School.find({}, 'hsName').exec(callback);
		},
	},  function (err, results) {
		if (err) { return next(err);}
		console.log(results);
    res.render('participant_create', { title: 'New Participant', schools: results.school, interests: results.topic});
	})
};

// handle Create on Post 
exports.participant_create_post = [

    // Validate fields.
    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('address').isLength({ min: 1 }).trim().withMessage('no address entered'),
    body('email').isLength({ min: 1 }).trim().withMessage('no email entered'),

    // Sanitize fields.
    sanitizeBody('firstname').trim().escape(),
    sanitizeBody('lastname').trim().escape(),
    sanitizeBody('address').trim().escape(),
    sanitizeBody('email').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('participant_create', { title: 'New Participant', errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Create an Author object with escaped and trimmed data.
            var participant = new Participant(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    email: req.body.email,
					school: req.body.school,
					interests: req.body.interests
                });
            participant.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(participant.url);
            });
        }
    }
];

// Display delete form on GET.

exports.participant_delete_get = function(req, res, next) {
	
    Participant.findById(req.params.id).exec(function(err, results) {
        if (err) { return next(err); }
        if (results==null) { res.redirect('/catalog/participant'); }
        res.render('participant_delete', { title: 'Delete participant', participant: results})
    });
};
// Handle delete on POST.
exports.participant_delete_post = function(req, res, next) {
    Participant.findByIdAndDelete(req.params.id, function deleteParticipant(err){
        if (err) return next(err);
        res.redirect('/catalog/participants');
    });
};

// Display update form on GET.
exports.participant_update_get = function(req, res, next) {
	
	async.parallel({
		participant: function(callback){
			Participant.findById(req.params.id).exec(callback);
		},
		topic: function(callback) {
			Topic.find({},'title').exec(callback);
		},
		school: function(callback) {
			School.find({}, 'hsName').exec(callback);
		},
	},  function (err, results) {
		if (err) { return next(err)
		res.redirect('/catalog/Participant/'); }
		console.log(results);	            
	    res.render('participant_update', { 
	            title: 'Update Participation',
	            participant: results.participant,
				interests: results.topic,
				schools: results.school
		})
    })
};

// Handle update on POST.
exports.participant_update_post = [

    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('address').isLength({ min: 1 }).trim().withMessage('no address entered'),
    body('email').isLength({ min: 1 }).trim().withMessage('no email entered'),

    sanitizeBody('firstname').trim().escape(),
    sanitizeBody('lastname').trim().escape(),
    sanitizeBody('address').trim().escape(),
    sanitizeBody('email').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('participant_update', { 
                title: 'Update Participant', 
                _id: participant._id, 
                participant: participant, 
                errors: errors.array()});
            return;
        }
        else {
            var participant = new Participant({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                email: req.body.email,
				school: req.body.school,
				interests: req.body.interests,
                _id:req.params.id
            });
            Participant.findByIdAndUpdate(req.params.id, participant, {}, function (err, theparticipant) {
                if (err) {return next(err);}
                res.redirect(theparticipant.url);
            });
        }
    }
];
