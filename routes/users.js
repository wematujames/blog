const express = require("express"),
	router = express.Router(),
	User = require("../models/User"),
	{
		getUsers,
		createUser,
		getUser,
		updateUser,
		deleteUser
	} = require("../controllers/users"),
	{ protect, authorize } = require("../middleware/auth"),
	advRes = require("../middleware/advRes");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advRes(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
