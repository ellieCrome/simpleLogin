var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./app/config/database');
var authenticate = require('./app/services/authenticate.js');
var session = require('client-sessions');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

//Set up session
app.use(session({
  cookieName: 'session',
  secret: config.secret,
  duration: 30 * 60 * 1000, //30 mins
  activeDuration: 5 * 60 * 1000, //5 mins
}));

//Connect to the database
mongoose.connect(config.database);

//Pass passport for configuration
require('./app/config/passport')(passport);

//Routes
app.use('/signup', require('./app/routes/signup.js'));
app.use('/authenticate', require('./app/routes/authenticate.js'), passport.authenticate('local', { session: false }));
app.use('/memberinfo', require('./app/routes/memberinfo.js'), passport.authenticate('local', { session: false }));

//Logout
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

//Start the server
app.listen(port);
console.log("Server started on port " + port);
