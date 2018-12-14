var Session = require('../models/Session');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list.
exports.session_list = function(req, res) {
    Session.find()
    .sort([['sessionNum', 'ascending']])
    .exec(function (err, list_sessions) {
        if (err) { return next(err);}
        res.render('session_list', { title: 'Sessions', session_list: list_sessions});
    });
};

// Display detail page.
exports.session_detail = function(req, res, next) {
	
	Session.findById(req.params.id).exec(function (err, session)
	{
		if (err) { return next(err); }
		if (session==null) { // No results.
			var err = new Error('Session not found');
			err.status = 404;
			return next(err);
        }
		res.render('session_detail', { title: 'Session Details', session: session})
	});
};

// Display  create form on GET.
exports.session_create_get = function(req, res) {
    res.render('session_create', { title: 'New Session'});
};

// Handle  create on POST.
exports.session_create_post = [
	//validate fields
	body('sessionNum').isLength({ min: 1 }).trim().withMessage('An ID is required.').isNumeric().withMessage('ID cannot contain non-alphanumeric characters.'),
	body('time').isLength({min:1}).trim().matches(/^[a-z\d\-_\/\:\;\s]+$/i).withMessage('Please specify a session time.'),
	//sanitize
	sanitizeBody('sessionNum').trim().escape(),
	sanitizeBody('time').trim(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('session_create', { title: 'New Session', data: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var session = new Session(
                {
                    sessionNum: req.body.sessionNum,
                    time: req.body.time
                });
            session.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(session.url);
            });
        }
	}
];

// Display delete form on GET.
exports.session_delete_get = function(req, res, next) {

    Session.findById(req.params.id).exec(function (err, session)
	{
		if (err) { return next(err); }
		if (session==null) { // No results.
			res.redirect('/catalog/Session/');
        }
		res.render('session_delete', { title: 'Delete Session', session: session})
	});
};

// Handle delete on POST.
exports.session_delete_post = function(req, res) {
			
	Session.findByIdAndRemove(req.params.id, function deleteSession(err) {
		if (err) {return next(err); }
		res.redirect('/catalog/session')
	});
};

// Display update form on GET.
exports.session_update_get = function(req, res) {
	
    Session.findById(req.params.id).exec(function (err, session)
	{
		if (err) { return next(err); }
		if (session==null) { // No results.
			res.redirect('/catalog/Session/');
        }

		res.render('session_form', { title: 'Update Session', sessionNum: session.sessionNum, time: session.time, _id: session._id })
	});
};

// Handle update on POST.
exports.session_update_post = [
	//validate fields
	body('sessionNum').isLength({ min: 1 }).trim().withMessage('An ID is required.').isNumeric().withMessage('ID cannot contain non-alphanumeric characters.'),
	body('time').isLength({min:1}).trim().matches(/^[a-z\d\-_\/\:\;\s]+$/i).withMessage('Please specify a session time.'),
	//sanitize
	sanitizeBody('sessionNum').trim().escape(),
	sanitizeBody('time').trim(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
			res.render('session_form', { title: 'Update Session', sessionNum: req.body.sessionNum, time: req.body.time, _id: req.body._id, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var session = new Session(
                {
                    sessionNum: req.body.sessionNum,
                    time: req.body.time,
					 _id: req.params.id
                });
            Session.findByIdAndUpdate(req.params.id, session, {}, function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(session.url);
            });
        }
	}
];
