// random data libraries
const faker = require("faker");
var moment = require("moment");
var zipcodes = require("zipcodes");

// for PostgresSql
const pgClient = require("./index");

// modules for creating csv
const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "reviews.csv");
var output = ``;

const writeReviews = fs.createWriteStream(filename);
writeReviews.write(output, "utf8");

genReview = (writer, encoding, callback) => {
  let randLoc, date;
  let locationProb = [1, 2, 3];
  let j = 1000000;
  var write = () => {
    let ok = true;

    do {
      j--;
      let randRev = Math.floor(Math.random() * 21);
      if (j % 10000 === 0) {
        console.log(j);
      }
      for (let i = 0; i < randRev; i++) {
        let randNums = Math.random();
        randOwn = Math.floor(randNums * 11);
        randLoc = Math.floor(randNums * 4);
        date = faker.date.between("2005-2-1", "2019-12-7");
        stringDate = JSON.stringify(date);

        var rating = Math.floor(randNums * 5) + 1;
        var dateS = stringDate;
        var title = faker.lorem.sentence();
        var review = faker.lorem.paragraph();
        if (locationProb[randLoc] === 2) {
          var dateP = JSON.stringify(moment(date).add(1, "M"));
        } else {
          var dateP = stringDate;
        }
        var author = faker.name.findName();
        var ownerR = faker.lorem.paragraph();
        var aLocation = `"${faker.address.city()}, ${faker.address.stateAbbr()}"`;
        var ListingId = j;
        var data = `${rating},${dateS},${title},${review},${dateP},${author},${aLocation},${ownerR},${ListingId}\n`;
        if (j === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (j > 0 && ok);
    if (j > 0) {
      writer.once("drain", write);
    }
  };
  write();
};

genReview(writeReviews, "utf-8", () => {
  writeReviews.end(err => {
    if (err) {
      console.log(err);
    } else {
      pgClient
        .query(
          `COPY reviews FROM '/Users/EuiHyo_Mi/Desktop/sdc-service-david/db/postgresDB/reviews.csv' DELIMITER ',' CSV`
        )
        .then(() => {
          console.log("Successfully written reviews!");
          // pgClient.end();
        })
        .catch(err => {
          throw err;
        });
    }
  });
});

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

// genLocations();
