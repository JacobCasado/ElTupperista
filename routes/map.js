const express = require("express");
const { ensureLoggedIn } = require("connect-ensure-login");
const router = express.Router();
const User = require("../models/User");


router.get('/', (req, res, next) => {
  User.find().then( users => {
    res.render('map/map', {
      users,
      userStr: JSON.stringify(users)
    });
  }).catch(e=> next(e));
});

module.exports = router;