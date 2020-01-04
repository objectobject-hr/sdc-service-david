var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/reviewsSchema", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("Welcome to Mongoose!!");
});

var Schema = mongoose.Schema;

var reviewsSchema = new Schema({
  rating: Number,
  dateS: String,
  title: String,
  review: String,
  dateP: String,
  author: String,
  aLocation: String,
  ownerR: String,
  ListingId: { type: Number, index: true }
});

exports.reviews = mongoose.model("Review", reviewsSchema);

var zipsSchema = new Schema({
  zipcode: String,
  ListingId: { type: Number, index: true }
});

exports.zips = mongoose.model("Zip", zipsSchema);
