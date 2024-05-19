const passport = require("passport");
const User = require("../db/models/userModel");
const Quotes = require("../db/models/quoteModel");

module.exports = function (app) {

  app.route("/quote").get(async (req, res) => {
    console.log("Requesting data...");
    try {
      let data = await Quotes.find();
      // Send a random quote to user
      let randomNumber = Math.floor(Math.random() * data.length);
      console.log(randomNumber);
      let randomQuote = data[randomNumber];
      res.status(201).send(
        randomQuote
      );
      console.log("Success");
    } catch(err) {
      console.log(err);
    }
  });

  app.route('/user').get((req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.json({username: req.user.username})
    } else {
      res.json({username: null});
    }
  },
  (req, res) => {
    res.json({username: req.user.username});
  });
  
  app.route('/register').post((req, res, next) => {
    console.log('registering user');
    User.register(new User({
      email: req.body.email,
      username: req.body.username
    }),
      req.body.password,
      function(err, user) {
        if (err) {
          console.log('Error registerting!');
          res.json({message: 'Error registering!'});
          return;
        }
        console.log('user registered!');
        return next(err, user);
      }
    );
  },
    passport.authenticate('local'),
    (req, res) => {
      if (req.isAuthenticated()) {
        res.json({username: req.user.username});
      } else {
        console.log("Error logging in after registration!")
        res.json({message: "Login unsuccessful!"});
      };
  });

  app.route("/login").post(passport.authenticate("local"),
    (req, res) => {
    if (req.isAuthenticated()) {
      res.json({username: req.user.username});
    } else {
      res.json({message: "Could not log in!"});
    };
  })

  app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  /*
  app.route("/auth/github").get(passport.authenticate("github"));

  app.route("/auth/github/callback").get(passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
    req.session.user_id = req.user.id
    res.redirect("/chat");
  })
  */
  
}
