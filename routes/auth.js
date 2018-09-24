const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
	res.render("auth/login", {
		"message": req.flash("error")
	});
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/auth/login",
	failureFlash: true,
	passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
	res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
	let username = req.body.username;
	const password = req.body.password;
	let email = req.body.email;

	if (username === "" || password === "" || email === "") {
		res.render("auth/signup", {
			message: "Username, password and email are required"
		});
		return;
	} else {
		username = username.toLowerCase().trim();
		email = email.toLowerCase().trim();
	}

	User.findOne( { $or: [{username: username}, {email: email}] }, (err, user) => {

		if (user !== null) {
			let message;

			if (user.username && user.username === username) {
				message = `The username '${username}' already exists`; 
			        
			} else if(user.email && user.email === email) {
				message = `The email '${email}' already exists`;     
			}

			res.render("auth/signup", {
				message: message
			});

			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			username,
			password: hashPass,
			email
		});

		newUser.save()
			.then(() => {
				res.redirect("/");
			})
			.catch(err => {
				res.render("auth/signup", {
					message: "Something went wrong"
				});
			})
		});
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});


router.get("/profile", (req, res) => {
	res.render("auth/profile");
});

router.post("/profile", (req, res) => {
	const email = req.body.email;
	const address = req.body.address;
	const isCooker = req.body.isCooker;
	console.log(isCooker)
	const id = req.user._id;

	if (email === "" || address === "") {
		res.render("auth/profile", {
			message: "Indicate email and address"
		});
		return;
	}

	User.findByIdAndUpdate(id, { email, address, isCooker })
			.then(() => {
				res.redirect("auth/profile");
			})
			.catch(err => {
				res.render("auth/profile", {
					message: "Something went wrong"
				});
			})
	
});

module.exports = router;