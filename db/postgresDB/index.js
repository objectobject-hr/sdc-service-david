require("dotenv").config();
const { Client } = require("pg");

module.exports = pgClient = new Client();

pgClient
  .connect()
  .then(() => {
    console.log("Connected To Postgres!!");
    pgClient.query(`CREATE TABLE IF NOT EXISTS zips (
      zipcode TEXT,
      ListingId int
    );

    CREATE TABLE IF NOT EXISTS reviews (
      rating int not NULL,
      dateS TEXT,
      title TEXT not null,
      review TEXT not null,
      dateP TEXT,
      author TEXT not null,
      aLocation TEXT,
      ownerR TEXT,
      ListingId int not Null
    );`);
  })
  .catch(error => {
    console.log(error);
  });

/*
  Creating index commands

  create index idx_reviews_listingid on reviews(listingid);
  create index idx_zips_listingid on zips(listingid);
*/
//
