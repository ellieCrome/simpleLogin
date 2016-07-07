'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/database');
var passport = require('passport');
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
            user.comparePassword(password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = authenticateService.genToken(user, config.secret);

                    req.session = token;
                    res.redirect('/memberInfo')
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
        user: user
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
