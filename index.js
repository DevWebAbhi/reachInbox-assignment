const express = require("express");
require('dotenv').config();
const session = require('express-session');
const passport = require("passport");
const googleOAuthRoute = require("./GoogleOAuth/googleOAuthRouter");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({ 
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", googleOAuthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
