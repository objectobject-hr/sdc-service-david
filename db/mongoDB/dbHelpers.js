const reviews = require("./index").reviews;
const zips = require("./index").zips;

module.exports = {
  getReviews: (req, callback) => {
    reviews.find({ ListingId: req.params.id }, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  getZips: (req, callback) => {
    zips.find({ ListingId: req.params.id }, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  writeReviews: (req, callback) => {
    // console.log(req);
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
          callback(err);
        } else {
          callback();
        }
      }
    );
  },
  writeZips: (req, callback) => {
    zips.create(
      {
        zipcode: req.body.zipcode,
        ListingId: req.body.ListingId
      },
      err => {
        if (err) {
          callback(err);
        } else {
          callback();
        }
      }
    );
  },
  updateReviews: (req, callback) => {
    // console.log("hitting dbHleper", req, "body --->", req.body);
    reviews.findByIdAndUpdate(
      { _id: req.params.id },
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
          callback(err);
        } else {
          callback();
        }
      }
    );
  },
  updateZips: (req, callback) => {
    zips.findByIdAndUpdate(
      { _id: req.params.id },
      {
        zipcode: req.body.zipcode,
        ListingId: req.body.ListingId
      },
      err => {
        if (err) {
          callback(err);
        } else {
          callback();
        }
      }
    );
  },
  deleteReviews: (req, callback) => {
    reviews.findByIdAndRemove({ _id: req.params.id }, err => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  },
  deleteZips: (req, callback) => {
    zips.findByIdAndRemove({ _id: req.params.id }, err => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  }
};
