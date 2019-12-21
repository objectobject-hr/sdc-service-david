require("dotenv").config();
const { Pool } = require("pg");

var pgClient = new Pool();

pgClient
  .connect()
  .then(() => {
    console.log("Connected To Postgres!!");
    pgClient.query(`CREATE TABLE IF NOT EXISTS zips (
      zipcode varchar(255),
      ListingId int
    );

    CREATE TABLE IF NOT EXISTS reviews (
      rating INT not NULL,
      dateS date,
      title TEXT not null,
      review TEXT not null,
      dateP date,
      author TEXT not null,
      aLocation TEXT,
      ownerR TEXT,
      ListingId INT not Null
    );`);
  })
  .catch(error => {
    console.log(error);
  });
