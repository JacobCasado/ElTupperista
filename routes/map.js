const express = require("express");
const { ensureLoggedIn } = require("connect-ensure-login");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
	res.render("map/map");
});


module.exports = router;