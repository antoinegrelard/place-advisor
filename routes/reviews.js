var express = require('express');
var router = express.Router();

var reviews = [
				  {
					name: 'McDo',
					placeType: 'Fastfood',
					stars: 4 
				  },
				  {
					name: 'KFC',
					placeType: 'Fastfood',
					stars: 3 
				  },
				  {
					name: 'Subway',
					placeType: 'Fastfood',
					stars: 3 
				  }
			  ];

/* GET reviews page. */
router.get('/', function(req, res, next) {
  res.render('reviews', { title: 'Reviews', test: reviews });
});

/* API GET reviews. */
router.get('/api', function(req, res, next) {
  res.send(reviews);
});

/* API POST review. */
router.post('/api', function(req, res, next) {
	if(req.body.name === undefined || req.body.placeType === undefined || req.body.stars === undefined) {
		res.status(400).send("bad attributes");
	} else {
		var newReview = {
							name: req.body.name,
							placeType: req.body.placeType,
							stars: req.body.stars
						 }
		reviews.push(newReview);
		res.send(reviews);
	}
});

/* API DELETE review. */
router.delete('/api', function(req, res, next) {
  res.send(req.body);
});

/* API GET one review. */
router.get('/api/:id', function(req, res, next) {
  var id= req.params.id;
  res.send(reviews[id]);
});

/* API PUT review. */
router.put('/api/:id', function(req, res, next) {
  if(req.body.name === undefined || req.body.placeType === undefined || req.body.stars === undefined) {
		res.status(400).send("bad attributes");
  } else {
	  var newReview= {
	  					name: req.body.name,
	  					placeType: req.body.placeType,
	  					stars: req.body.stars
	  				 }
	  var id= req.params.id;
	  if(reviews[id] != null) {
	  	reviews[id]= newReview;
	  	res.send(reviews);
	  } else {
	  	res.send("no review found to modify");
	  }
  }
});

/* API DELETE review. */
router.delete('/api/:id', function(req, res, next) {
  var id= req.params.id;
  if(reviews[id] != null) {
    reviews.splice(id,1);
    res.send(reviews);
   } else {
   	res.send("no review found to delete");
   }
});

module.exports = router;