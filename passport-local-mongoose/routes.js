const passport = require('passport');
const User = require('./models/user');
const router = require('express').Router();

let verifyCount = 0;

router.get(
  '/user',
  (req, res, next) => {
    console.log(req.session)
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({username: null});
    }
  },
  (req, res) => {
    res.json({username: req.user.username});
  }
);

router.post(
  '/register',
  (req, res, next) => {
    console.log('registering user');
    User.register(new User({email: req.body.email, username: req.body.username}), req.body.password, function(err, user) {
      if (err) {
        console.log('error while user register!', err);
        return next(err);
      }
      console.log('user registered!');
      return next(err, user);
    });
  },
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.json({username: req.user.username});
    } else {
      res.json({username: null});
    };
  }
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.json({username: req.user.username});
    } else {
      res.json({username: null});
    };
  }
);

router.get('/Games*', function(req, res, next) {
  verifyCount++;
  console.log(verifyCount);
  if (req.isAuthenticated()) {
    console.log("Passed verification");
    next();
  } else {
    res.redirect("/login")
  }
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;