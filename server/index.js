const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const Reviews = require("../db/postgresDB/").Reviews;
// const Zips = require("../db/postgresDB/").Zips;
const path = require("path");
const reviews = require("../db/mongoDB").reviews;
const zips = require("../db/mongoDB").zips;

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/reviews/:id", (req, res) => {
  reviews.findOne({ ListingId: req.params.id }, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/zips/:id", async (req, res) => {
  zips.findOne({ ListingId: req.params.id }, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port -> ${port} <-`);
});

app.post("/createReviews", (req, res) => {
  reviews.create(
    {
      rating: req.body.rating,
      dateS: req.body.dateS,
      title: req.body.title,
      review: req.body.review,
      dateP: req.body.dateP,
      author: req.body.authour,
      aLocation: req.body.aLocation,
      ownerR: req.body.ownerR,
      ListingId: req.body.ListingId
    },
    err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Data successfully inserted!!");
      }
    }
  );
});

app.post("/createZips", (req, res) => {
  zips.create(
    {
      zipcode: req.body.zipcode,
      ListingId: req.body.ListingId
    },
    err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Zip code successfully inserted!!");
      }
    }
  );
});
