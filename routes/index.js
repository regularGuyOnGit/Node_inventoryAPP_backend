var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // Redirect to the homepage which i'm going to create.
  res.redirect("/homepage");
});

module.exports = router;
