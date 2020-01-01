const dbHelper = require("../db/mongoDB/dbHelpers");

module.exports = {
  getReviews: (req, res) => {
    dbHelper.getReviews(req, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  getZips: (req, res) => {
    dbHelper.getZips(req, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  writeReviews: (req, res) => {
    dbHelper.writeReviews(req, err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Data successfully inserted!!");
      }
    });
  },
  writeZips: (req, res) => {
    dbHelper.writeZips(req, err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Zip code successfully inserted!!");
      }
    });
  },
  updateReviews: (req, res) => {
    // console.log("hitting controller", req.params.id);
    dbHelper.updateReviews(req, err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Review update Complete!!");
      }
    });
  },
  updateZips: (req, res) => {
    dbHelper.updateZips(req, err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("zips update Complete!!");
      }
    });
  },
  deleteReviews: (req, res) => {
    dbHelper.deleteReviews(req, err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Reviews has been deleted!!");
      }
    });
  },
  deleteZips: (req, res) => {
    dbHelper.deleteZips(req, err => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send("Zips has been deleted!!");
      }
    });
  }
};
