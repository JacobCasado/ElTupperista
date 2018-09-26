const express = require('express');
const router  = express.Router();
const Tupper = require('../models/Tupper');


// C(R)UD -> Muestra todos los tuppers
router.get('/', (req, res, next) => {
  Tupper.find().then(tupper => {
    console.log(tupper.length)
    res.render('tupper/tupperList',{tupper, title:'Lista de tuppers'});
  }).catch(e =>  next(e))
});

// (C)RUD ->  Muestra el formulario de creación de un tupper
router.get('/new', (req, res, next) => {
  res.render('tupper/createTupper');
});

// (C)RUD ->  Crea un tupper
router.post('/new', (req, res, next) => {

  let {tuppername, price, quantity, user} = req.body; 
  Tupper.create({tuppername, price, quantity, user})
  .then(tupper => {
    res.redirect('/tupper');
  }).catch(e =>  next(e))
});

// CRU(D) -> Elimina un tupper
router.get('/delete/:tupperId', (req, res, next) => {
  Tupper.findByIdAndRemove(req.params.tupperId).then(() => {
    res.redirect('/tupper');
  }).catch(e =>  next(e))
});

// CR(U)D -> Update, muestra el formulario
router.get('/update/:tupperId', (req, res, next) => {
  Tupper.findById(req.params.tupperId).then(tupper => {
    res.render('tupper/editTupper', {tupper});
  }).catch(e => next(e));
});

// CR(U)D -> Update, muestra el formulario
router.post('/update/:tupperId', (req, res, next) => {
  
  let {tuppername, price, quantity, user} = req.body; 
  Tupper.findByIdAndUpdate(req.params.tupperId, {tuppername, price, quantity, user})
  .then(() => res.redirect('/tupper'))
  .catch(e => next(e));
});

module.exports = router;