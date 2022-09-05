var mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
  name: String,
  img: String,
});

let movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
