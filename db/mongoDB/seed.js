// random data libraries
const faker = require("faker");
var moment = require("moment");

// for Mongodb
const Zips = require("./index.js").zips;
const Reviews = require("./index.js").reviews;
var mongoose = require("mongoose");
// modules for creating csv

const genReview = async () => {
  let revObj, randOwn, randLoc, listReviews, date;
  let ownerProb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let locationProb = [1, 2, 3];
  for (let k = 0; k < 10; k++) {
    listReviews = [];
    for (let j = 0; j < 100; j++) {
      let randRev = Math.floor(Math.random() * 21);

      for (let i = 0; i < randRev; i++) {
        randOwn = Math.floor(Math.random() * 11);
        randLoc = Math.floor(Math.random() * 4);
        date = faker.date.between("2005-2-1", "2019-12-7");
        revObj = {};
        revObj.rating = Math.floor(Math.random() * 5) + 1;
        revObj.dateS = date;
        revObj.title = faker.lorem.sentence();
        revObj.review = faker.lorem.paragraph();
        if (locationProb[randLoc] === 2) {
          revObj.dateP = moment(date).add(1, "M");
        } else {
          revObj.dateP = date;
        }
        revObj.author = faker.name.findName();
        if (ownerProb[randOwn] === 4) {
          revObj.ownerR = faker.lorem.paragraph();
        }
        if (locationProb[randLoc] === 2) {
          revObj.aLocation = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
        }
        revObj.ListingId = j;
        listReviews.push(revObj);
      }
      // if (j % 1000 === 0) {
      //   console.log("reviews", j);
      // }
    }
    // if (k % 10 === 0) {
    console.log("k value", k);
    // }
    await Reviews.insertMany(listReviews)
      .then(() => {
        console.log("Insertion done!!!");
      })
      .catch(e => {
        console.error("seeding function failed: " + e);
      });
  }
  mongoose.connection.close();
};

genReview();

genLocations = async () => {
  for (let j = 0; j < 10; j++) {
    let zipArray = [];
    let zipCodeObj;
    for (let i = 0; i < 100; i++) {
      zipCodeObj = {};
      zipCodeObj.zipCode = faker.address.zipCode().slice(0, 5);
      zipCodeObj.ListingId = i;
      zipArray.push(zipCodeObj);
    }
    // console.log(zipArray);
    // if (j % 10 === 0) {
    console.log("zips", j);
    // }
    await Zips.insertMany(zipArray)
      .then(() => {
        // console.log("Zipcodes created");
      })
      .catch(e => {
        console.error("Error: " + e);
      });
  }
};

genLocations();
