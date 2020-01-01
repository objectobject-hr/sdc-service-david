// const express = require("express");
// // const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const controller = require("./controller");
// const morgan = require("morgan");

// const app = express();
// const port = process.env.PORT || 3004;

// // app.use(cors());
// app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.listen(port, () => {
//   console.log(`Server listening on port -> ${port} <-`);
// });

//Router
// app.get("/reviews/:id", controller.getReviews);
// app.get("/zips/:id", controller.getZips);

// app.post("/reviews", controller.writeReviews);
// app.post("/zips", controller.writeZips);

// app.put("/reviews/:id", controller.updateReviews);
// app.put("/zips/:id", controller.updateZips);

// app.delete("/reviews/:id", controller.deleteReviews);
// app.delete("/zips/:id", controller.deleteZips);

// { "zipcode": "sdfsd",
// "ListingId": 2323
// }

// {
//   "rating":3,
//   "dateS": "2012-09-30",
//   "title": "blahblahblah",
//   "review": "fsdfsdfjklejf sldjfklsej fkl klsejfksjeklf skef selj",
//   "dateP": "2012-10-30",
//   "author": "Ms. Parker Davis",
//   "aLocation": "Los Angeles, TX",
//   "ownerR": "fsdfsdf fsefwefw sjdflkjsdfkls alsjdfks",
//   "ListingId": 1000001
// }
