var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var login = require('./services/login.js');
var session = require('client-sessions');
const path = require('path');
const http = require('http');
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
require('./config/passport')(passport);

//Routes
app.use('/', express.static('./client/'));
app.use('/resources', express.static('./bower_components/'));
app.use('/signup', require('./routes/signup.js'));
app.use('/login', require('./routes/login.js'), passport.authenticate('local', { session: false }));
app.use('/memberinfo', require('./routes/memberinfo.js'), passport.authenticate('local', { session: false }));

//Logout
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/signup');
});


app.get('/*', function(req, res, next){
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});
//Start the server
app.listen(port);
console.log("Server started on port " + port);
