// random data libraries
const faker = require("faker");
var moment = require("moment");

// for Mongodb
// const Zips = require("./index.js").zips;
// const Reviews = require("./index.js").reviews;
// var mongoose = require("mongoose");
// modules for creating csv

var zipcodes = require("zipcodes");

const fs = require("fs");
const path = require("path");

// const filename = path.join(__dirname, "reviews.csv");
// var output = `rating,dateS,title,review,dateP,author,aLocation,ownerR,ListingId\n`;

// const writeReviews = fs.createWriteStream(filename);
// writeReviews.write(output, "utf8");

// genReview = (writer, encoding, callback) => {
//   let randLoc, date;
//   let locationProb = [1, 2, 3];
//   let j = 10000000;
//   var write = () => {
//     let ok = true;

//     do {
//       j--;
//       let randRev = Math.floor(Math.random() * 5);
//       if (j % 10000 === 0) {
//         console.log(j + " Reviews Written");
//       }
//       for (let i = 0; i < randRev; i++) {
//         let randNums = Math.random();
//         randOwn = Math.floor(randNums * 11);
//         randLoc = Math.floor(randNums * 4);
//         date = faker.date.between("2005-2-1", "2019-12-7");
//         stringDate = JSON.stringify(date);

//         var rating = Math.floor(randNums * 5) + 1;
//         var dateS = stringDate;
//         var title = faker.lorem.sentence();
//         var review = faker.lorem.paragraph();
//         if (locationProb[randLoc] === 2) {
//           var dateP = moment(date).add(1, "M");
//         } else {
//           var dateP = stringDate;
//         }
//         var author = faker.name.findName();
//         var ownerR = faker.lorem.paragraph();
//         var aLocation = `"${faker.address.city()}, ${faker.address.stateAbbr()}"`;
//         var ListingId = j;
//         var data = `${rating},${dateS},${title},${review},${dateP},${author},${aLocation},${ownerR},${ListingId}\n`;
//         if (j === 0) {
//           writer.write(data, encoding, callback);
//         } else {
//           ok = writer.write(data, encoding);
//         }
//       }
//     } while (j > 0 && ok);
//     if (j > 0) {
//       writer.once("drain", write);
//     }
//   };
//   write();
// };

// genReview(writeReviews, "utf-8", () => {
//   writeReviews.end(err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("reviews created!!");
//       // mongoose.connection.close();
//     }
//   });
// });

const zipCodeFile = path.join(__dirname, "zips.csv");
var zipCodes = `zipcode,ListingId\n`;

const writeZipCodes = fs.createWriteStream(zipCodeFile);
writeZipCodes.write(zipCodes, "utf8");

genLocations = (writer, encoding, callback) => {
  var zipss = [];

  for (let z = 0; z < 200; z++) {
    zipss.push(zipcodes.random().zip);
  }

  let i = 1000;

  var writeZip = () => {
    let ok = true;
    do {
      i--;
      if (i % 1000000 === 0) {
        console.log(i + " zipCodes Written");
      }
      const zipCode = zipss[Math.floor(Math.random() * 201)];
      const ListingId = i;
      const zips = `${zipCode},${ListingId}\n`;
      if (i === 0) {
        writer.write(zips, encoding, callback);
      } else {
        ok = writer.write(zips, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once("drain", writeZip);
    }
  };
  writeZip();
};

genLocations(writeZipCodes, "utf-8", () => {
  writeZipCodes.end(err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Writing Zip code done!!");
    }
  });
});

/*
terminal command for importing csv file

mongoimport --db=reviewsSchema --collection=reviews --type=csv --headerline --file=db/mongoDB/reviews.csv --numInsertionWorkers 6

mongoimport --db=reviewsSchema --collection=zips --type=csv --headerline --file=db/mongoDB/zips.csv --numInsertionWorkers 6

*/
