var School = require('../models/School');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list.
exports.school_list = function(req, res) {
    School.find()
    .sort([['hs_id', 'ascending']])
    .exec(function (err, list_schools) {
        if (err) { return next(err);}
        res.render('school_list', { title: 'Schools', school_list: list_schools});
    });
};

// Display detail page.
exports.school_detail = function(req, res) {
	
    School.findById(req.params.id).exec(function (err, school)
	{
		if (err) { return next(err); }
		if (school==null) { // No results.
			var err = new Error('School not found');
			err.status = 404;
			return next(err);
        }
		res.render('school_detail', { title: 'School Details', school: school})
	});
};

// Display  create form on GET.
exports.school_create_get = function(req, res) {
    res.render('school_create', { title: 'Add School'});
};

// Handle  create on POST.
exports.school_create_post = [
	//validate fields
	body('hs_id').isLength({ min: 1 }).trim().withMessage('School Code is required.').isNumeric().withMessage('code must be a number.'),
	body('hsName').isLength({min:1}).trim().withMessage('The School Name must be specified').isAlphanumeric().withMessage('Special Characters are not allowed.'),
	
	//sanitize
	sanitizeBody('hs_id').trim().escape(),
    sanitizeBody('hsName').trim().escape(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('school_create', { title: 'New School', data: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var school = new School(
                {
                    hs_id: req.body.hs_id,
                    hsName: req.body.hsName,
                });
            school.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(school.url);
            });
        }
	}
];

// Display delete form on GET.
exports.school_delete_get = function(req, res) {
    
	School.findById(req.params.id).exec(function (err, school)
	{
		if (err) { return next(err); }
		if (school==null) { // No results.
			res.redirect('/catalog/School/');
        }
		res.render('school_delete', { title: 'Delete School', school: school})
	});
};

// Handle delete on POST.
exports.school_delete_post = function(req, res) {
    
	School.findByIdAndRemove(req.params.id, function deleteSchool(err) {
		if (err) {return next(err); }
		res.redirect('/catalog/school')
	});
};

// Display update form on GET.
exports.school_update_get = function(req, res) {
    
	School.findById(req.params.id).exec(function (err, school)
	{
		if (err) { return next(err); }
		if (school==null) { // No results.
			res.redirect('/catalog/school/');
        }
		res.render('school_form', { title: 'Update School', hs_id: school.hs_id, hsName: school.hsName, _id: school._id })
	});
};

// Handle update on POST.
exports.school_update_post = [
    
	//validate fields
	body('hs_id').isLength({ min: 1 }).trim().withMessage('School Code is required.').isNumeric().withMessage('code must be a number.'),
	body('hsName').isLength({min:1}).trim().withMessage('The School Name must be specified').isAlphanumeric().withMessage('Special Characters are not allowed.'),
	
	//sanitize
	sanitizeBody('hs_id').trim().escape(),
    sanitizeBody('hsName').trim().escape(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('school_form', { title: 'Update School', hs_id: req.body.hs_id, hsName: req.body.hsName, _id: req.body._id, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var school = new School(
                {
                    hs_id: req.body.hs_id,
                    hsName: req.body.hsName,
					_id: req.params.id
                });
            School.findByIdAndUpdate(req.params.id, school, {}, function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(school.url);
            });
        }
	}
];