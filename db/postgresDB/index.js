require("dotenv").config();
const { Client } = require("pg");

module.exports = pgClient = new Client();

// pgClient
//   .connect()
//   .then(() => {
//     console.log("Connected To Postgres!!");
//     pgClient.query(`CREATE TABLE IF NOT EXISTS zips (
//       zipcode varchar(255),
//       ListingId int
//     );

//     CREATE TABLE IF NOT EXISTS reviews (
//       rating TEXT not NULL,
//       dateS TEXT,
//       title TEXT not null,
//       review TEXT not null,
//       dateP TEXT,
//       author TEXT not null,
//       aLocation TEXT,
//       ownerR TEXT,
//       ListingId TEXT not Null
//     );`);
//   })
//   .catch(error => {
//     console.log(error);
//   });
