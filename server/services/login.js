'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/database');
var passport = require('passport');
var loginService = {};

loginService.login = function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    User.findOne({
        username: username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ message: 'Authentication failed. User not found.' });
        } else {
            user.comparePassword(password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = loginService.genToken(user, config.secret);

                    req.session = token;
                    res.redirect('/memberInfo')
                } else {
                    res.send({ message: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
};

loginService.genToken = function(user, secret) {
    var expires = loginService.expiresIn(1); // 1 day
    var token = jwt.encode({
        user: user
    }, secret);

    return {
        token: token,
        expires: expires,
        user: user
    };
}

loginService.expiresIn = function(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}


module.exports = loginService;
