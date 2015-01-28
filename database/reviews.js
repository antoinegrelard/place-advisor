var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  name:  String,
  placeType: String,
  stars:   Number
});

module.exports = mongoose.model('Reviews', reviewSchema);