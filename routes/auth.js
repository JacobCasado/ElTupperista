const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
	res.render("auth/login", {
		"errorMessage": req.flash("error"),  
		user: req.user
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
			errorMessage: "Username, password and email are required"
		});
		return;
	} else {
		username = username.toLowerCase().trim();
		email = email.toLowerCase().trim();
	}

	User.findOne( { $or: [{username: username}, {email: email}] }, (err, user) => {
		
		if (user !== null) {
			
			if (user.username && user.username === username) {
				errorMessage = `The username '${username}' already exists`; 
			        
			} else if(user.email && user.email === email) {
				errorMessage = `The email '${email}' already exists`;     
			}
			res.render("auth/signup", {
				errorMessage: errorMessage
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
				res.render("auth/login", { user:req.user });
			})
			.catch(err => {
				res.render("auth/signup", {
					errorMessage: "Something went wrong"
				});
			})
		});
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});


router.get("/profile", (req, res) => {
	res.render("auth/profile", { user: req.user });
});

router.post("/profile", (req, res) => {
	const email = req.body.email;
	const address = req.body.address;
	const isCooker = req.body.isCooker;
	const id = req.user._id;

	if (email === "" || address === "") {
		res.render("auth/profile", {
			errorMessage: "Indicate email and address"
		});
		return;
	}

	User.findByIdAndUpdate(id, { email, address, isCooker })
		.then(() => {
			res.render("auth/profile", {
				successMessage: 'The user was updated successfully'
			});
		})
		.catch(err => {
			res.render("auth/profile", {
				errorMessage: "Something went wrong"
			});
		})
});

module.exports = router;