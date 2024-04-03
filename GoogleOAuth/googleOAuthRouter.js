const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const readEmails = require("../mailReader");

const googleOAuthRoute = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function(accessToken, refreshToken, profile, cb) {
    readEmails(accessToken, refreshToken, profile);
    
    return cb(null, profile);
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


googleOAuthRoute.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly'] })
);


googleOAuthRoute.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        
        res.status(200).send({msg:"Successfull"});
    }
);


googleOAuthRoute.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = googleOAuthRoute;