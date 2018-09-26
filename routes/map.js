// const express = require("express");
// const { ensureLoggedIn } = require("connect-ensure-login");
// const router = express.Router();
// const User = require("../models/User");


// router.get('/', (req, res, next) => {
//   User.find().then( users => {
//     res.render('tupper/list', {
//       users,
//       userStr: JSON.stringify(users)
//     });
//   }).catch(e=> next(e));
// });

// module.exports = router;