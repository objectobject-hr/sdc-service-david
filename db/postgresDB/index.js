// const pgp = require('pg-promise')({});
// const db = pgp(connectionString);
// module.exports = db;
const promise = require("bluebird"); // best promise library today
const pgPromise = require("pg-promise"); // pg-promise core library
const initOptions = {
  // Use a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise
};
const pgp = pgPromise(initOptions);
const connection = {
  host: "localhost", // server name or IP address;
  port: 7777,
  database: "sdcPG",
  user: "EuiHyo_Mi"
};
// const connectionString = 'postgres://localhost:5432/sdc_pg';
// Creating the database instance:
const db = pgp(connection);
module.exports = { db, pgp };
