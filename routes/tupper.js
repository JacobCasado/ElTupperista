const express = require('express');
const router = express.Router();
const Tupper = require('../models/Tupper');


// C(R)UD -> Muestra todos los tuppers
router.get('/', (req, res, next) => {
	Tupper.find()
	.populate('user')
		.then(tuppers => {
			console.log(tuppers)
			res.render('tupper/list', {
				tuppers,
				tupperStr: JSON.stringify(tuppers)
			});
		}).catch(e => next(e))
});


// (C)RUD ->  Crea un tupper
router.post('/new', (req, res, next) => {
	let { tuppername, price, quantity }  = req.body;
	let user = req.user._id;

	const newTupper = new Tupper({ tuppername, price, quantity, user });

	newTupper.save()
		.then(() => {
			res.render("profile", {
				successMessage: "Tupper saved successfully"
			});
		})
		.catch(err => {
			res.render("profile", {
				errorMessage: "Something went wrong"
			});
		})
});

// CRU(D) -> Elimina un tupper
router.get('/delete/:tupperId', (req, res, next) => {
	Tupper.findByIdAndRemove(req.params.tupperId).then(() => {
		res.redirect('/tupper');
	}).catch(e => next(e))
});

// CR(U)D -> Update, muestra el formulario
// router.get('/update/:tupperId', (req, res, next) => {
// 	Tupper.findById(req.params.tupperId).then(tupper => {
// 		res.render('tupper/edit', {
// 			tupper
// 		});
// 	}).catch(e => next(e));
// });

// CR(U)D -> Update, muestra el formulario
router.post('/update/:tupperId', (req, res, next) => {

	let {
		tuppername,
		price,
		quantity,
		user
	} = req.body;
	Tupper.findByIdAndUpdate(req.params.tupperId, {
			tuppername,
			price,
			quantity,
			user
		})
		.then(() => res.redirect('/profile'))
		.catch(e => next(e));
});

module.exports = router;