var express = require('express');
var router = express.Router();

var reviewsDb = require('../database/reviews');

/* API GET search. */
router.route('/').get(function (req, res) {
	console.log(req.query);
	if(req.query.name || req.query.placeType || req.query.stars) {
		reviewsDb.find(req.query, function (err, reviews) {
			if(err) {
				res.status(500).send({'error': err});
			} else {
				if(req.accepts('text/html')) {
					res.set('Content-Type', 'text/html');
					res.render('search', {reviews: reviews});
				} else {
					res.set('Content-Type', 'application/json');
					res.status(200).send(reviews);
				}
			}
		});
	} else {
		if(req.accepts('text/html')) {
			res.set('Content-Type', 'text/html');
			res.render('search');
		}
	}
});

module.exports = router;