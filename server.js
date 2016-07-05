var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./app/config/database'); // get db config file
var authenticate =  require('app/services/authenticate.js')
// var User        = require('./app/models/user'); // get the mongoose model
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./app/config/passport')(passport);

app.use('/signup', require('./app/routes/signup.js'));
app.use('/authenticate', require('./app/routes/authenticate.js'));
app.use('/memberinfo', passport.authenticate('jwt', { session: false }), require('./app/routes/memberinfo.js'));

// Start the server
app.listen(port);
