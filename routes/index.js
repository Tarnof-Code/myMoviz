var express = require("express");
var router = express.Router();
var request = require("sync-request");
var movieModel = require("../models/movies");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Backend myMoviz" });
});

router.get("/new-movies", function (req, res, next) {
  var requete = request(
    "GET",
    "https://api.themoviedb.org/3/discover/movie?api_key=83d269b724363e3d2b5e0328c3be9e36&language=fr-FR&region=fr&sort_by=popularity.desc&include_image_language=fr,null"
  );
  var filmList = JSON.parse(requete.body);
  res.json(filmList);
  console.log(filmList);
});

router.post("/wishlist-movie", async function (req, res, next) {
  let newMovie = new movieModel({
    name: req.body.name,
    img: req.body.img,
  });
  let movieSaved = await newMovie.save();
  var result = false;
  if (movieSaved.name) {
    result = true;
  }

  res.json({ result });
});

router.delete("/wishlist-movie/:name", async function (req, res, next) {
  console.log(req.params.name);
  let returDb = await movieModel.deleteOne({ name: req.params.name });
  var result = false;
  if (returDb.deletedCount == 1) {
    result = true;
  }

  res.json({ result });
});

router.get("/wishlist-movie", async function (req, res, next) {
  let wishListData = await movieModel.find();
  console.log(wishListData);

  res.json(wishListData);
});

module.exports = router;
