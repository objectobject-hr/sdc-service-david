// const foo = require("../foo.config");
// const mongoose = require();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("sdcPG", "EuiHyo_Mi", "Rladmlgus90", {
  host: "localhost",
  dialect: "postgres"
});

class Reviews extends Sequelize.Model {}
class Zips extends Sequelize.Model {}
Reviews.init(
  {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    dateS: {
      type: Sequelize.DATEONLY
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    review: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    dateP: {
      type: Sequelize.DATEONLY
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    aLocation: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ownerR: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    ListingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false
    }
  },
  { sequelize, modelName: "review" }
);

Zips.init(
  {
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ListingId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { sequelize, modelName: "zip" }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database");
  })
  .catch(e => {
    console.error("database connection FAILURE: " + e);
  });

module.exports.Reviews = Reviews;
module.exports.Zips = Zips;
