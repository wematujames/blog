const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/useraudit");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("user", "admin"));

router.route("/stats").get(getStats);

module.exports = router;
