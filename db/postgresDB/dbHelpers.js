const db = require("./index");

module.exports = {
  getReviews: (req, callback) => {
    db.query(`SELECT * FROM reviews where ListingId =${req.params.id}`);
  }
};
