var express = require('express');
var router = express.Router();
var School = require('../controllers/schoolController');
var Participant = require('../controllers/participantController');
var Presenter = require('../controllers/presenterController');
var Room = require('../controllers/roomController');
var Schedule = require('../controllers/scheduleController');
var Session = require('../controllers/sessionController');
var Topic = require('../controllers/topicController');

router.get('/', Schedule.index); //landing page

//Participant Routes
///////////////////////////////////////////////
router.get('/Participant/create', Participant.participant_create_get);

router.post('/Participant/create', Participant.participant_create_post);

router.get('/Participant/:id/delete', Participant.participant_delete_get);

router.post('/Participant/:id/delete', Participant.participant_delete_post);

router.get('/Participant/:id/update', Participant.participant_update_get);

router.post('/Participant/:id/update', Participant.participant_update_post);

router.get('/Participant/:id', Participant.participant_detail);

router.get('/Participants', Participant.participant_list);

//Presenter Routes
///////////////////////////////////////////////

router.get('/Presenter/create', Presenter.presenter_create_get);

router.post('/Presenter/create', Presenter.presenter_create_post);

router.get('/Presenter/:id/delete', Presenter.presenter_delete_get);

router.post('/Presenter/:id/delete', Presenter.presenter_delete_post);

router.get('/presenter/:id/update', Presenter.presenter_update_get);

router.post('/presenter/:id/update', Presenter.presenter_update_post);

router.get('/presenter/:id', Presenter.presenter_detail);

router.get('/presenters', Presenter.presenter_list);

//Schedule Routes
///////////////////////////////////////////////

router.get('/Schedule/create', Schedule.schedule_create_get);

router.post('/Schedule/create', Schedule.schedule_create_post);

router.get('/Schedule/:id/delete', Schedule.schedule_delete_get);

router.post('/Schedule/:id/delete', Schedule.schedule_delete_post);

router.get('/Schedule/:id/update', Schedule.schedule_update_get);

router.post('/Schedule/:id/update', Schedule.schedule_update_post);

router.get('/schedule/:id', Schedule.schedule_detail);

router.get('/schedule', Schedule.schedule_list)

//Topic Routes
///////////////////////////////////////////////

router.get('/Topic/create', Topic.topic_create_get);

router.post('/Topic/create', Topic.topic_create_post);

router.get('/Topic/:id/delete', Topic.topic_delete_get);

router.post('/Topic/:id/delete', Topic.topic_delete_post);

router.get('/Topic/:id/update', Topic.topic_update_get);

router.post('/Topic/:id/update', Topic.topic_update_post);

router.get('/topic/:id', Topic.topic_detail);

router.get('/topic', Topic.topic_list)

//Session Routes
///////////////////////////////////////////////

router.get('/Session/create', Session.session_create_get);

router.post('/Session/create', Session.session_create_post);

router.get('/Session/:id/delete', Session.session_delete_get);

router.post('/Session/:id/delete', Session.session_delete_post);

router.get('/Session/:id/update', Session.session_update_get);

router.post('/Session/:id/update', Session.session_update_post);

router.get('/session/:id', Session.session_detail);

router.get('/session', Session.session_list)

//School Routes
///////////////////////////////////////////////

router.get('/School/create', School.school_create_get);

router.post('/School/create', School.school_create_post);

router.get('/School/:id/delete', School.school_delete_get);

router.post('/School/:id/delete', School.school_delete_post);

router.get('/School/:id/update', School.school_update_get);

router.post('/School/:id/update', School.school_update_post);

router.get('/school/:id', School.school_detail);

router.get('/school', School.school_list)

//Room Routes
///////////////////////////////////////////////
router.get('/Room/create', Room.room_create_get);

router.post('/Room/create', Room.room_create_post);

router.get('/Room/:id/delete', Room.room_delete_get);

router.post('/Room/:id/delete', Room.room_delete_post);

router.get('/Room/:id/update', Room.room_update_get);

router.post('/Room/:id/update', Room.room_update_post);

router.get('/room/:id', Room.room_detail);

router.get('/room', Room.room_list)

/////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
