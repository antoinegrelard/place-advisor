var express = require('express');
var router = express.Router();

var reviewsDb = require('../database/reviews');

/* API GET reviews page. */
router.route('/').get(function (req, res) {
	reviewsDb.find({}, function (err, reviews) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			if(req.accepts('text/html') ) {
				res.set('Content-Type', 'text/html');
				res.render('reviews', {reviews: reviews});
			} else {
				res.set('Content-Type', 'application/json');
				res.status(200).send(reviews);
			}
		}
	});
});

/* API DELETE all reviews. */
router.route('/').delete(function (req, res) {
	reviewsDb.remove( function (err, review) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.status(204);
		}
	});
});

/* API POST review from web */
router.route('/add').get(function (req, res) {
	if(req.accepts('text./html')) {
		res.set('Content-Type', 'text/html');
		res.render('add');
	}
});

/* API GET top reviews from web */
router.route('/top').get(function (req, res) {
	reviewsDb.find().limit(3).sort({stars: -1}).find(function (err, reviews) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			if(req.accepts('text/html') ) {
				res.set('Content-Type', 'text/html');
				res.render('top', {reviews: reviews});
			} else {
				res.set('Content-Type', 'application/json');
				res.status(200).send(reviews);
			}
		}
	});
});

/* API POST review */
router.route('/').post(function (req, res) {
	if(req.body.name === undefined || req.body.placeType === undefined || req.body.stars === undefined) {
		res.status(400).send("bad attributes");
	} else {
		var newReview = {
			name: req.body.name,
			placeType: req.body.placeType,
			stars: req.body.stars
		};

		reviewsDb.create(newReview, function(err, reviews) {
			if(err) {
				res.status(500).send({'error': err});
			} else {
				res.status(201).send(newReview);
			}
		});
	}
});

module.exports = router;