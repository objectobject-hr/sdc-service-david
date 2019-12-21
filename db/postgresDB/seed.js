require("dotenv").config();
const faker = require("faker");
var moment = require("moment");
var zipcodes = require("zipcodes");
const { Pool } = require("pg");

var pgClient = new Pool();

genReview = async () => {
  let revObj, randOwn, randLoc, date;
  let listReviews = [];
  let ownerProb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let locationProb = [1, 2, 3];
  for (let j = 0; j < 100; j++) {
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
      revObj.author = escape(faker.name.findName());
      if (ownerProb[randOwn] === 4) {
        revObj.ownerR = faker.lorem.paragraph();
      }
      if (locationProb[randLoc] === 2) {
        revObj.aLocation = escape(
          `${faker.address.city()}, ${faker.address.stateAbbr()}`
        );
      }
      revObj.ListingId = j;
      listReviews.push(revObj);
    }
  }
  listReviews.forEach((review, index) =>
    await pgClient
      .query(
        `INSERT INTO reviews (rating, dateS, title, review, dateP, author, aLocation, ownerR, ListingId) VALUES ('${review.rating}', '${review.dateS}', '${review.title}', '${review.review}', '${review.dateP}', '${review.author}', '${review.aLocation}', '${review.ownerR}', '${review.ListingId}');`
      )
      .then(() => {
        console.log(index);
      })
      .catch(e => {
        console.error("seeding function failed: ", e);
      })
  );
};

genLocations = async () => {
  let zipCodeObj;
  let zipArray = [];

  for (let i = 0; i < 100; i++) {
    zipCodeObj = {};
    let randZip = zipcodes.random();
    zipCodeObj.zipCode = randZip.zip;
    zipCodeObj.ListingId = i;
    zipArray.push(zipCodeObj);
  }
  zipArray.forEach(zip =>
    await pgClient
      .query(
        `INSERT INTO zips (zipcode, ListingId) VALUES ('${zip.zipCode}', '${zip.ListingId}');`
      )
      .then(() => {
        // console.log("zip code Created!!@!@");
      })
      .catch(e => {
        console.error("Error: ");
      })
  );
};
genLocations();
genReview();
