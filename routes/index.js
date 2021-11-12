const express = require("express");
const router = express.Router();
const { getHome, getAbout, getContact } = require("../controllers/index");

router.route("/").get(getHome);
router.route("/contact").get(getContact);
router.route("/about").get(getAbout);

module.exports = router;
