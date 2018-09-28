const express = require("express");
const { ensureLoggedIn } = require("connect-ensure-login");
const router = express.Router();
const User = require("../models/User");
const Tupper = require("../models/Tupper");

router.get("/", ensureLoggedIn(), (req, res) => {
  Tupper.find({ user: req.user })
    .then(tuppers => {
      res.render("profile", {
        tuppers,
        tupperStr: JSON.stringify(tuppers),
        user: req.user
      });
    })
    .catch(e => next(e));
});

router.post("/", ensureLoggedIn(), (req, res) => {
  const address = req.body.address;
  const isCooker = req.body.isCooker;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const id = req.user._id;

  const location = {
    type: "Point",
    coordinates: [Number(latitude), Number(longitude)]
  };

  if (address === "") {
    res.render("profile", {
      errorMessage: "Indicate an address"
    });
    return;
  }
  console.log(isCooker);

  User.findByIdAndUpdate(id, { address, location, isCooker })
    .then(() => {
      res.redirect("/profile");
    })
    .catch(err => {
      res.redirect("/profile");
    });
});

module.exports = router;
