const db = require("../db/postgresDB/index");

module.exports = {
  getReviews: (req, res) => {
    db.query(`SELECT * FROM reviews where ListingId="${req.params.id}";`)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  getZips: (req, res) => {
    db.query(`SELECT * FROM zips where ListingId="${req.params.id}";`)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
