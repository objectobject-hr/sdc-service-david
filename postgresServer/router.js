const router = require("express").Router();
const controller = require("./controller");

router.route("/reviews/:id").get(controller.getReviews);

router.route("./zips/:id").get(controller.getZips);

module.exports = router;
