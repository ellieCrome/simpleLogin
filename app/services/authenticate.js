'use strict';
var User = require('../models/user'); // get the mongoose model
var jwt = require('jwt-simple');
var config = require('../config/database'); // get db config file
var authenticateService = {};

authenticateService.authenticateHandler = function(req, res) {
    var name = req.query.name;
    var password = req.query.password;

    User.findOne({
        name: name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ message: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = authenticateService.genToken(user, config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ message: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
};

authenticateService.genToken = function(user, secret) {
    var expires = authenticateService.expiresIn(1); // 1 day
    var token = jwt.encode({
        exp: expires
    }, secret);

    return {
        token: token,
        expires: expires,
        user: user
    };
}

authenticateService.expiresIn = function(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}


module.exports = authenticateService;
