const Reviews = require("./index.js").Reviews;
const Zips = require("./index.js").Zips;
const faker = require("faker");
var moment = require("moment");
var zipcodes = require("zipcodes");

genReview = async () => {
  let revObj, randOwn, randLoc, listReviews, date;
  let ownerProb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let locationProb = [1, 2, 3];
  for (let j = 0; j < 10001; j++) {
    let randRev = Math.floor(Math.random() * 25);
    listReviews = [];

    for (let i = 0; i < randRev; i++) {
      let randNums = Math.random();
      randOwn = Math.floor(randNums * 11);
      randLoc = Math.floor(randNums * 4);
      date = faker.date.between("2005-2-1", "2019-12-7");
      revObj = {};
      revObj.rating = Math.floor(randNums * 5) + 1;
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
    await Reviews.sync({ force: false })
      .then(() => {
        Reviews.bulkCreate(listReviews);
        // listReviews.forEach(review => Reviews.create(review));
        // console.log(j);
      })
      .then(() => {
        // console.log("review data created");
      })
      .catch(e => {
        console.error("seeding function failed: ");
      });
  }
};

genLocations = () => {
  let zipCodeObj;
  let zipArray = [];

  for (let i = 0; i < 10001; i++) {
    zipCodeObj = {};
    let randZip = zipcodes.random();
    zipCodeObj.zipCode = randZip.zip;
    zipCodeObj.ListingId = i;
    zipArray.push(zipCodeObj);
  }
  Zips.sync({ force: true })
    .then(() => {
      Zips.bulkCreate(zipArray);
      // zipArray.forEach(zip => Zips.create(zip));
    })
    .then(() => {
      // console.log("Zipcodes created");
    })
    .catch(e => {
      console.error("Error: ");
    });
};

genReview();
genLocations();
