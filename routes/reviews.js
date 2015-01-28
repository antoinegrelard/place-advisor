var express = require('express');
var router = express.Router();

var reviewsDb = require('../database/reviews');

/* API GET reviews page. */
router.route('/api').get(function (req, res) {
	reviewsDb.find({}, function (err, reviews) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.send(reviews);
		}
	});
});

/* API POST review */
router.route('/api').post(function (req, res) {
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
				res.status(201).send(reviews);
			}
		});
	}
});

/* API GET one review. */
router.route('/api/:id').get(function (req, res) {
	var id = req.params.id;
	reviewsDb.findById(id, function (err, review) {
		if (err) {
			res.status(404).send({'error': err});
		} else {
			res.send(review);
		}
	});
});

/* API PUT review. */
router.route('/api/:id').put(function (req, res) {
	if(req.body.name === undefined || req.body.placeType === undefined || req.body.stars === undefined) {
		res.status(400).send("bad attributes");
	} else {
	  var newReview= {
	  					name: req.body.name,
	  					placeType: req.body.placeType,
	  					stars: req.body.stars
	  				 }
	  var id= req.params.id;
	  reviewsDb.findByIdAndUpdate(id, newReview, function (err, review) {
		if (err) {
			res.status(404).send({'error': err});
		} else {
			res.send(newReview);
		}
	});
	}
});

/* API GET one review. */
router.route('/api/:id').delete(function (req, res) {
	var id = req.params.id;
	reviewsDb.findByIdAndRemove(id, function (err, review) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.send("review deleted");
		}
	});
});

module.exports = router;