const express = require("express");
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./logger');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 3001;

dotenv.config();

const app = express();

// Set up APP framwork
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Set up Passport oauth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


//RateLimit
const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 min.
    max: 2, //  NOTE: Change this. value 2 is for test.
    message: "Too many requests from this IP."
});
app.use(limiter);


//CRUD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const memberRoutes = require('./routes/MemberRoutes');
app.use('/member', memberRoutes);


//Route
app.get("/api", (req, res) => {
    var delay = (Math.floor((Math.random()*1000)%5)); //random sleep for 0-4

    var msg = "Hello from server! ... loading take "+(delay)+" sec.";
    logger.info(msg)

    setTimeout(function() {
        res.json({message: msg});
    }, delay * 1000);
});

app.get("/suggestion", (req, res) => {
    const {q} = req.query;
    const mockData = [
        'Alice','Anne','Aaron', 'Bob', 'Bayer', 'Pete', 'Payut','Pavit', 'Tom'
    ];
    const filteredData = mockData.filter((data) => 
        data.toLowerCase().includes(q.toLowerCase())
    );

    res.send(filteredData)
});

//Authentication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/google/callback', (req, res) => {
    console.log("callback.....")
    res.redirect('/')
})
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
