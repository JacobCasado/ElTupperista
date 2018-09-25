const express = require("express");
const { ensureLoggedIn } = require("connect-ensure-login");
const router = express.Router();
const User = require("../models/User");

router.get("/", ensureLoggedIn(), (req, res) => {
	res.render("profile", { user: req.user });
});

router.post("/", ensureLoggedIn(), (req, res) => {
	const address = req.body.address;
	const isCooker = req.body.isCooker;
	const id = req.user._id;

	if (address === "") {
		res.render("profile", {
			errorMessage: "Indicate an address"
		});
		return;
	}

	User.findByIdAndUpdate(id, { address, isCooker })
		.then(() => {
			res.render("profile", {
				successMessage: 'The user was updated successfully'
			});
		})
		.catch(err => {
			res.render("profile", {
				errorMessage: "Something went wrong"
			});
		})
});

module.exports = router;