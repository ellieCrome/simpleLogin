'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('./../config/database.js');

var memberInfoService = {};

memberInfoService.memberInfoHandler = function(req, res) {

    if (req.session && req.session.token) {
        var token = req.session.token;
        var decoded = jwt.decode(token, config.secret);

        User.findOne({
            name: decoded.user.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ messge: 'Authentication failed. User not found.' });
            } else {
                res.json({ message: 'Welcome in the member area ' + user.name + '!' });
            }
        });
    } else {
        return res.status(403).send({ message: 'No token provided.' });
    }

};



module.exports = memberInfoService;
