var express = require('express');
var router = express.Router();

var usersDb = require('../database/users');

/* API GET users listing. */
router.route('/').get(function (req, res) {
	usersDb.find({}, function (err, users) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.send(users);
		}
	});
});

/* API DELETE all users. */
router.route('/').delete(function (req, res) {
	usersDb.remove( function (err, user) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.status(204);
		}
	});
});

/* API POST user */
router.route('/').post(function (req, res) {
	if(req.body.username === undefined || req.body.password === undefined) {
		res.status(400).send("bad attributes");
	} else {
		var newUser = {
			username: req.body.username,
			password: req.body.password,
		};

		usersDb.create(newUser, function(err, users) {
			if(err) {
				res.status(500).send({'error': err});
			} else {
				res.status(201).send(newUser);
			}
		});
	}
});

module.exports = router;
