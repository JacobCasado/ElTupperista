const express = require('express');
const { ensureLoggedIn} = require("connect-ensure-login");
const router = express.Router();
const Tupper = require('../models/Tupper');
const _ = require('lodash');


// C(R)UD -> Muestra todos los tuppers
router.get('/', ensureLoggedIn(), (req, res, next) => {
	Tupper.find()
	.populate('user')
		.then(tuppers => {
			let usernames = [];
				tuppers.forEach(e => {if(e.user !== null) usernames.push({username: e.user.username, coordinates: e.user.location.coordinates})});
			usernames = _.uniqBy(usernames, 'username');
			res.render('tupper/list', {
				tuppers,
				tupperStr: JSON.stringify(tuppers),
				usernames,
				user: req.user
			});
		}).catch(e => next(e))
});


// (C)RUD ->  Crea un tupper
router.post('/new', ensureLoggedIn(), (req, res, next) => {
	let { tuppername, price, quantity }  = req.body;
	let user = req.user._id;

	const newTupper = new Tupper({ tuppername, price, quantity, user });

	newTupper.save()
		.then(() => {
			res.redirect("/profile")
		})
		.catch(err => {
			res.render("profile", {
				errorMessage: "Something went wrong"
			});
		})
});

// CRU(D) -> Elimina un tupper
router.get('/delete/:tupperId', ensureLoggedIn(), (req, res, next) => {
	Tupper.findById(req.params.tupperId)
	.then(tupper => {
		if(req.user._id.toString() == tupper.user.toString()){
			tupper.remove();
		}
		res.redirect("/tupper");
	})
	.catch(err => next(err));
	// Tupper.findByIdAndRemove(req.params.tupperId).then(() => {
	// 	res.redirect('/tupper');
	// }).catch(e => next(e))
});

// CR(U)D -> Update, muestra el formulario
router.get('/show/:tupperId', ensureLoggedIn(), (req, res, next) => {
	Tupper.findById(req.params.tupperId).then(tupper => {
		res.render('tupper/show', {
			tupper
		});
	}).catch(e => next(e));
});

// CR(U)D -> Update, muestra el formulario
router.post('/update/:tupperId', ensureLoggedIn(), (req, res, next) => {

	let {tuppername,price,quantity} = req.body;
		Tupper.findByIdAndUpdate(req.params.tupperId, {
			tuppername,
			price,
			quantity
		})
		.then(() => res.redirect('/profile'))
		.catch(e => next(e));
});

module.exports = router;