// random data libraries
const faker = require("faker");
var moment = require("moment");
var zipcodes = require("zipcodes");

// for PostgresSql
const pgClient = require("./index");

// modules for creating csv
const fsPromises = require("fs").promises;
const path = require("path");

genReview = async () => {
  let revObj, randOwn, randLoc, date;
  let listReviews = [];
  let ownerProb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let locationProb = [1, 2, 3];
  for (let j = 0; j < 1; j++) {
    let randRev = Math.floor(Math.random() * 25);

    for (let i = 0; i < randRev; i++) {
      let randNums = Math.random();
      randOwn = Math.floor(randNums * 11);
      randLoc = Math.floor(randNums * 4);
      date = faker.date.between("2005-2-1", "2019-12-7");
      stringDate = JSON.stringify(date);
      revObj = {};
      revObj.rating = Math.floor(randNums * 5) + 1;
      revObj.dateS = stringDate;
      revObj.title = faker.lorem.sentence();
      revObj.review = faker.lorem.paragraph();
      if (locationProb[randLoc] === 2) {
        revObj.dateP = JSON.stringify(moment(date).add(1, "M"));
      } else {
        revObj.dateP = stringDate;
      }
      revObj.author = faker.name.findName();
      // if (ownerProb[randOwn] === 4) {
      revObj.ownerR = faker.lorem.paragraph();
      // }
      // if (locationProb[randLoc] === 2) {
      revObj.aLocation = `${faker.address.city()}, ${faker.address.stateAbbr()}`;

      // }
      revObj.ListingId = j;
      listReviews.push(revObj);
    }
  }

  const output = [
    "rating",
    "dateS",
    "title",
    "review",
    "dateP",
    "author",
    "aLocation",
    "ownerR",
    "ListingId"
  ];
  const filename = path.join(__dirname, "output.csv");

  await listReviews.forEach((review, index) => {
    const row = [];
    row.push(review.rating);
    row.push(review.dateS);
    row.push(review.title);
    row.push(review.review);
    row.push(review.dateP);
    row.push(review.author);
    row.push(review.aLocation);
    row.push(review.ownerR);
    row.push(review.ListingId);

    output.push(row.join());
    console.log(index);
  });

  fsPromises
    .writeFile(filename, output)
    .then(() => {
      console.log("Successfully written!");
      pgClient.query(
        `COPY reviews FROM '/Users/EuiHyo_Mi/Desktop/sdc-service-david/db/postgresDB/output.csv' DELIMITER '|' CSV`
      );
    })
    .catch(err => {
      throw err;
    });
};

// genLocations = async () => {
//   let zipCodeObj;
//   let zipArray = [];

//   for (let i = 0; i < 100000; i++) {
//     zipCodeObj = {};
//     let randZip = zipcodes.random();
//     zipCodeObj.zipCode = randZip.zip;
//     zipCodeObj.ListingId = i;
//     zipArray.push(zipCodeObj);
//   }
//   await zipArray.forEach(async (zip, index) => {
//     await pgClient
//       .query(
//         `INSERT INTO zips (zipcode, ListingId) VALUES ('${zip.zipCode}', '${zip.ListingId}');`
//       )
//       .then(() => {
//         console.log(index);
//       })
//       .catch(e => {
//         console.error("Error: ");
//       });
//   });
// };

genReview();
// genLocations();
