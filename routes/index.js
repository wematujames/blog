const express = require("express");
const router = express.Router();
const { getHome, getAbout, getContact } = require("../controllers/index");
const { ensureAuthorized, ensureGuest } = require("../middleware/authorize");

router.use(ensureGuest, ensureAuthorized);

router.route("/").get(getHome);
router.route("/contact").get(getContact);
router.route("/about").get(getAbout);

module.exports = router;
