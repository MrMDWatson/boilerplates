require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GitHubStrategy = require('passport-github').Strategy;
const User = require("./models/userModel");

module.exports = function (app) {

  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  /*
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://65de46dd-a675-40bf-a2e7-32b6b1a45b51-00-2nj2sx8sa840j.janeway.replit.dev/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      myDataBase.findAndModify(
        { id: profile.id },
        {},
        {
          $setOnInsert: {
            id: profile.id,
            name: profile.displayName || 'John Doe',
            photo: profile.photos[0].value || '',
            email: Array.isArray(profile.emails) ? profile.emails[0].value : 'No public email',
            created_on: new Date(),
            provider: profile.provider || ''
          }, $set: {
            last_login: new Date()
          }, $inc: {
            login_count: 1
          }
        },
        { upsert: true, new: true },
        (err, doc) => {
          return cb(null, doc.value);
        }
      );
    }
  ));
  */
}