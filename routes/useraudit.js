const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/useraudit");
// router.use(ensureGuest, ensureAuthorized);

router.route("/stats").get(getStats);
// router.route("/contact").get(getContact);
// router.route("/about").get(getAbout);

module.exports = router;
