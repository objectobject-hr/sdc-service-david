// random data libraries
const faker = require("faker");
var moment = require("moment");
var zipcodes = require("zipcodes");

// for PostgresSql
const pgClient = require("./index");

// modules for creating csv
const fs = require("fs");
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
      revObj.aLocation = `"${faker.address.city()}, ${faker.address.stateAbbr()}"`;

      // }
      revObj.ListingId = j;
      listReviews.push(revObj);
    }
  }

  // var output = `rating, dateS, title, review, dateP, author, aLocation, ownerR, ListingId\n`;
  var output =
    "rating,dateS,title,review,dateP,author,aLocation,ownerR,ListingId\n";
  const filename = path.join(__dirname, "reviews.csv");
  // var review = listReviews[0];
  await listReviews.forEach((review, index) => {
    output += `${review.rating},${review.dateS},${review.title},${review.review},${review.dateP},${review.author},${review.aLocation},${review.ownerR},${review.ListingId}\n`;
    console.log(index);
  });

  const writeReviews = fs.createWriteStream(filename);
  writeReviews.write(output, "utf8");
  // .then(() => {
  //   // pgClient
  //   //   .query(
  //   //     `COPY reviews FROM '/Users/EuiHyo_Mi/Desktop/sdc-service-david/db/postgresDB/reviews.csv' DELIMITER ',' CSV`
  //   //   )
  //   //   .then(() => {
  //   //     console.log("Successfully written reviews!");
  //   //     // pgClient.end();
  //   //   });
  //   console.log("successfully created csvfile!!");
  // })
  // .catch(err => {
  //   throw err;
  // });
};

// genLocations = async () => {
//   let zipCodeObj;
//   let zipArray = [];

//   for (let i = 0; i < 10000000; i++) {
//     zipCodeObj = {};
//     let randZip = zipcodes.random();
//     zipCodeObj.zipCode = randZip.zip;
//     zipCodeObj.ListingId = i;
//     zipArray.push(zipCodeObj);
//   }

//   var zipCodes = "";

//   var filenameTwo = path.join(__dirname, "zips.csv");
//   await zipArray.forEach((zip, index) => {
//     zipCodes += `${zip.zipCode}, ${zip.ListingId}\n`;
//     console.log(index);
//   });
//   await fsPromises
//     .writeFile(filenameTwo, zipCodes)
//     .then(async () => {
//       await pgClient
//         .query(
//           `COPY zips FROM '/Users/EuiHyo_Mi/Desktop/sdc-service-david/db/postgresDB/zips.csv' DELIMITER ',' CSV`
//         )
//         .then(() => {
//           console.log("Successfully written zipcodes!");
//         });
//     })
//     .catch(err => {
//       throw err;
//     });
// };

genReview();
// genLocations();
