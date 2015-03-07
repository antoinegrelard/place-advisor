var express = require('express');
var router = express.Router();

var reviewsDb = require('../database/reviews');

/* API GET one review. */
router.route('/:id').get(function (req, res) {
	var id = req.params.id;
	reviewsDb.findById(id, function (err, review) {
		if (err) {
			res.status(404).send({'error': err});
		} else {
			if(req.accepts('text/html') ) {
				res.set('Content-Type', 'text/html');
				res.render('review', {review: review});
			} else {
				res.set('Content-Type', 'application/json');
				res.send(review);
			}
		}
	});
});

// edit one - HTML template
router.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	reviewsDb.findById(id, function (err, review) {
		if(err) {
			res.status(404).send({'error': err});
		} else {
			if(req.accepts('text/html') ) {
				res.set('Content-Type', 'text/html');
				res.render('edit', {review: review});
			}
		}
	});
});

/* API PUT review. */
router.route('/:id').put(function (req, res) {
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

/* API DELETE one review. */
router.route('/:id').delete(function (req, res) {
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